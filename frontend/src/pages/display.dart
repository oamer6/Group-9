import 'package:flutter/material.dart';

class Display extends StatefulWidget {
  @override
  _DisplayState createState() => _DisplayState();
}

class _DisplayState extends State<Display>{
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[200],
        appBar: AppBar(
          backgroundColor: Colors.deepOrange,
          title: Text('Tap Check Mark to Send'),
          centerTitle: true,
          elevation: 0,
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            // When check mark is pressed, send message
          },
          child: Icon(Icons.done),
          backgroundColor: Colors.deepOrange,
        ),
        body: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                  child: Stack(
                      children: <Widget>[
                        Container(
                          padding: EdgeInsets.fromLTRB(15.0, 5.0, 0.0, 0.0),
                          child: Text('Morse: ',
                              style: TextStyle(
                                  color: Colors.deepOrange,
                                  fontSize: 22, fontWeight: FontWeight.bold)),
                        ),
                        Container(
                          padding: EdgeInsets.fromLTRB(15.0, 35.0, 0.0, 0.0),
                          // This should either be scaled or the character allowed for message should be limited
                          child: Text('This would be the translation of English code to Morse',
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 18.0, fontWeight: FontWeight.bold)),
                        ),
                        Container(
                          padding: EdgeInsets.fromLTRB(15.0, 240.0, 0.0, 0.0),
                          child: Text('English: ',
                              style: TextStyle(
                                  color: Colors.deepOrange,
                                  fontSize: 22, fontWeight: FontWeight.bold)),
                        ),
                        Container(
                          padding: EdgeInsets.fromLTRB(15.0, 270.0, 0.0, 0.0),
                          // This should either be scaled or the character allowed for message should be limited
                          child: Text('This would be the translation of Morse code to English',
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 18.0, fontWeight: FontWeight.bold)),
                        ),
                      ]
                  )
              )
            ]
        )
    );
  }
}