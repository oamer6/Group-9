import 'package:flutter/material.dart';

class InboxDisplay extends StatefulWidget {
  @override
  _InboxDisplayState createState() => _InboxDisplayState();
}

class _InboxDisplayState extends State<InboxDisplay>{
  Map data = {};
  String message;

  @override
  Widget build(BuildContext context) {
    print(data);
    data = ModalRoute.of(context).settings.arguments;
    message = data.toString();
    message = message.substring(10 ,message.indexOf('}'));

    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.deepOrange,
        title: Text('Message'),
        centerTitle: true,
        elevation: 0,
      ),
      body: Center(
          child: Text(message,
              // this will have to be updated to include actual value
              style: TextStyle(
                  color: Colors.deepOrange,
                  fontSize: 22, fontWeight: FontWeight.bold)),

      )
    );
  }
}