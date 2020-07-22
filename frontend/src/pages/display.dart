import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class SizeConfig {
  static MediaQueryData _mediaQueryData;
  static double screenWidth;
  static double screenHeight;
  static double blockSizeHorizontal;
  static double blockSizeVertical;

  void init(BuildContext context) {
    _mediaQueryData = MediaQuery.of(context);
    screenWidth = _mediaQueryData.size.width;
    screenHeight = _mediaQueryData.size.height;
    blockSizeHorizontal = screenWidth / 100;
    blockSizeVertical = screenHeight / 100;
  }
}

class Display extends StatefulWidget {
  @override
  _DisplayState createState() => _DisplayState();
}

class _DisplayState extends State<Display>{


  Map routedData = {};



  @override
  Widget build(BuildContext context) {


    routedData = ModalRoute.of(context).settings.arguments;
    print(routedData);

    SizeConfig().init(context);
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
            Navigator.pushNamed(context, '/send', arguments: routedData);
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
                                  fontSize: SizeConfig.blockSizeVertical *3, fontWeight: FontWeight.bold)),
                        ),
                        Container(
                          padding: EdgeInsets.fromLTRB(15.0, 35.0, 0.0, 0.0),
                          // This should either be scaled or the character allowed for message should be limited
                          child: Text(routedData['morse'],
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: SizeConfig.blockSizeVertical *2.5, fontWeight: FontWeight.bold)),
                        ),
                        Container(
                          padding: EdgeInsets.fromLTRB(15.0, 240.0, 0.0, 0.0),
                          child: Text('English: ',
                              style: TextStyle(
                                  color: Colors.deepOrange,
                                  fontSize: SizeConfig.blockSizeVertical *3, fontWeight: FontWeight.bold)),
                        ),
                        Container(
                          padding: EdgeInsets.fromLTRB(15.0, 270.0, 0.0, 0.0),
                          // This should either be scaled or the character allowed for message should be limited
                          child: Text(routedData['message'],
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: SizeConfig.blockSizeVertical *2.5, fontWeight: FontWeight.bold)),
                        ),
                      ]
                  )
              )
            ]
        )
    );
  }
}