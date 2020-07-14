import 'package:flutter/material.dart';

class Translation extends StatefulWidget {
  @override
  _TranslationState createState() => _TranslationState();
}

class _TranslationState extends State<Translation> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.blue[900],
        title: Text('Translate a Message'),
        centerTitle: true,
        elevation: 0,
      ),
      body: Text('enter translation screen'),
    );
  }
}