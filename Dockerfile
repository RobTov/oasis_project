FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5496
CMD ["python", "manage.py", "runserver", "0.0.0.0:5496"]