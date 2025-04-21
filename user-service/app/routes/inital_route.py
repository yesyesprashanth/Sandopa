from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import FileResponse
from app.schemas.response_schema import StandardResponse
from loguru import logger
from pathlib import Path

router = APIRouter()

@router.get('/')
async def entry_route(request:Request):
    try:
        url = request.url._url
        port = request.url.port
        message = "User service"
        return StandardResponse(status=True, message=message, data={"url":url, "port":port}).model_dump()
    except:
        raise HTTPException(status_code=500, detail=StandardResponse(status=False, message="Internal Server Error").model_dump())



@router.get("/favicon.ico")
async def favicon(): 
    logger.info("logo endpoint accessed.")
    static_dir = Path(__file__).parent / "static"
    favicon_path = static_dir / "logo.ico"

    if not favicon_path.exists():
        logger.warning("logo file not found.")
        raise HTTPException(status_code=404, detail="logo not found")

    return FileResponse(favicon_path)