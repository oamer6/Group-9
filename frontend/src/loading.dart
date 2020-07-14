import 'package:flutter/material.dart';

class Loading extends StatefulWidget {
  @override
  _LoadingState createState() => _LoadingState();
}

class _LoadingState extends State<Loading>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      resizeToAvoidBottomPadding: false,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            child: Stack(
              children: <Widget>[
                Container(
                  padding: EdgeInsets.fromLTRB(15.0, 110.0, 0.0, 0.0),
                  child: Text('My',
                    style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: 80.0, fontWeight: FontWeight.bold)),
          ),
          Container(
            padding: EdgeInsets.fromLTRB(15.0, 175.0, 0.0, 0.0),
            child: Text('Morse',
              style: TextStyle(
                color: Colors.deepOrange,
                fontSize: 80.0, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    ),
    ],
    ));
  }
}