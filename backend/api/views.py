import requests
from rest_framework.viewsets import ViewSet
import random
from datetime import datetime
from django.http import JsonResponse
from googletrans import Translator
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from .serializers import LoginSerializer, RegisterSerializer
from django.contrib.auth import get_user_model


JOKES = [
    "— Доктор, что со мной? — Вы очень ленивы! — И что мне с этим делать? — Просто отдохните.",
    "Если бы лень была искусством, я был бы Пикассо.",
    "Мой компьютер думает быстрее меня. И, наверное, из-за этого я и работаю медленнее.",
]

MONTHS = {
    1: 'января',
    2: 'февраля',
    3: 'марта',
    4: 'апреля',
    5: 'мая',
    6: 'июня',
    7: 'июля',
    8: 'августа',
    9: 'сентября',
    10: 'октября',
    11: 'ноября',
    12: 'декабря'
}


def greetings(request):
    access_key = ''

    headers = {
        'X-Yandex-Weather-Key': access_key
    }

    response = requests.get(
        'https://api.weather.yandex.ru/v2/forecast?lat=55.75792&lon=49.23137', headers=headers)
    weather_data = response.json()

    weather_feels_like = weather_data['fact']['feels_like']
    temperature = weather_data['fact']['temp']

    now = datetime.now()
    day = now.day
    month = now.month
    year = now.year

    today_date = f'{day} {MONTHS[month]}, {year}'
    data = {
        'greeting': f'Здравствуйте, пользователь!',
        'date': f'Сегодня {today_date}',
        'weather': f'Температура в Казани: {temperature}°C, ощущается как {weather_feels_like}°C'
    }

    return JsonResponse(data)


class FormViewSet(ViewSet):

    def submit_greeting(self, request):
        text = request.data.get('text', '')
        if text.lower() == 'привет':
            return JsonResponse({'message': 'Привет, пользователь!'})
        return JsonResponse({'message': 'Некорректное приветствие'})

    def translate_text(self, request):
        text = request.data.get('text', '')

        translator = Translator()
        translated = translator.translate(text, dest='en')

        return JsonResponse({'translatedText': translated.text})

    def submit_joke(self, request):
        text = request.data.get('text', '')
        if text.lower() == 'анекдот':
            joke = random.choice(JOKES)
            return JsonResponse({'joke': joke})
        return JsonResponse({'message': 'Некорректный запрос'})


User = get_user_model()


class UserViewSet(ViewSet):

    def register(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def login(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
