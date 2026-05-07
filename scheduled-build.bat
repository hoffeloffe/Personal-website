@echo off
echo Starting scheduled build...
cd /d "c:\Users\chris\Desktop\PortfolioWebsite\my-portfolio\app"
call npm run build
echo Build completed at %date% %time%
