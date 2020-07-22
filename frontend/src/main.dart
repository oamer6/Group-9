import 'package:flutter/material.dart';
import 'package:morseapp/pages/home.dart';
import 'package:morseapp/pages/translation.dart';
import 'package:morseapp/pages/loading.dart';
import 'package:morseapp/pages/signup.dart';
import 'package:morseapp/pages/loading.dart';
import 'package:morseapp/pages/forgot.dart';
import 'package:morseapp/pages/inbox.dart';
import 'package:morseapp/pages/inbox_display.dart';
import 'package:morseapp/pages/send.dart';
import 'package:morseapp/pages/key.dart';
import 'package:morseapp/pages/menu.dart';
import 'package:morseapp/pages/display.dart';
import 'package:morseapp/pages/loading_inbox.dart';

void main() => runApp(MaterialApp(
  debugShowCheckedModeBanner: false,
  initialRoute: '/home',
  routes: {
    '/': (context) => Loading(),
    '/home': (context) => Home(),
    '/menu': (context) => Menu(),
    '/forgot': (context) => Forgot(),
    '/signup': (context) => SignUp(),
    '/translation': (context) => Translation(),
    '/display': (context) => Display(),
    '/key': (context) => MorseKey(),
    '/send': (context) => Send(),
    '/inbox': (context) => Inbox(),
    '/inbox_display': (context) => InboxDisplay(),
    '/loading_inbox': (context) => LoadingInbox(),
  },
));
