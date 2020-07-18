import 'package:flutter/material.dart';
import 'package:morseapp/pages/inbox.dart';

class InboxDisplay extends StatefulWidget {
  @override
  _InboxDisplayState createState() => _InboxDisplayState();
}

class _InboxDisplayState extends State<InboxDisplay>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.deepOrange,
        title: Text('Message'),
        centerTitle: true,
        elevation: 0,
      ),
      body: Center(
          child: Text('This is the message',
              // this will have to be updated to include actual value
              style: TextStyle(
                  color: Colors.deepOrange,
                  fontSize: 22, fontWeight: FontWeight.bold)),

      )
    );
  }
}