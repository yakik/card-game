FROM python:3.7-alpine
COPY backend/. /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD ["gunicorn","-w 4", "app:app"]