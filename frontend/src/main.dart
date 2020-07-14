import 'package:flutter/material.dart';
import 'package:morseapp/pages/home.dart';
import 'package:morseapp/pages/translation.dart';
import 'package:morseapp/pages/loading.dart';

void main() => runApp(MaterialApp(
  initialRoute: '/home',
  routes: {
    '/': (context) => Loading(),
    '/home': (context) => Home(),
    '/translation': (context) => Translation(),
  },
));
