import 'package:flutter/material.dart';
import 'package:morseapp/pages/home.dart';
import 'package:morseapp/pages/translation.dart';
import 'package:morseapp/pages/loading.dart';
import 'package:morseapp/pages/login.dart';
import 'package:morseapp/pages/signup.dart';
import 'package:morseapp/pages/loading.dart';
import 'package:morseapp/pages/forgot.dart';
import 'package:morseapp/pages/inbox.dart';
import 'package:morseapp/pages/send.dart';
import 'package:morseapp/pages/key.dart';

void main() => runApp(MaterialApp(
  initialRoute: '/home',
  routes: {
    '/': (context) => Loading(),
    '/home': (context) => Home(),
    '/forgot': (context) => Forgot(),
    '/signup': (context) => SignUp(),
    '/translation': (context) => Translation(),
    '/key': (context) => MorseKey(),
    '/send': (context) => Send(),
    '/inbox': (context) => Inbox(),
  },
));
