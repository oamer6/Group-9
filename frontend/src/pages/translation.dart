import 'package:flutter/material.dart';

class Translation extends StatefulWidget {
  @override
  _TranslationState createState() => _TranslationState();
}

class _TranslationState extends State<Translation> {

  int counter = 0;

  void getData() {

    // simulate network request for username
    Future.delayed(Duration(seconds: 3),() {
      print('yoshi');
    });
  }

  @override
  void initState(){
    super.initState();
    getData();
  }

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
      body: RaisedButton(
              onPressed: () {
                setState((){
                  counter += 1;
                });
              },
        child: Text('counter is $counter'),
            ),
    );
  }
}