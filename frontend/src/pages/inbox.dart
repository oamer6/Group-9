import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:http/http.dart';
import 'dart:convert';

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

class Inbox extends StatefulWidget {
  @override
  _InboxState createState() => _InboxState();
}

class _InboxState extends State<Inbox>{

  String message = "Hello Morse enthusiasts!";

    Map routedData = {};

    @override
    void initState(){
      //super.initState();
      //print("initialize inbox");
      //print('userName: ');
      //print(routedData['userName']);
      //getData(routedData['userName']);
      //List messages = [];
    }

    @override
    Widget build(BuildContext context) {


      routedData = ModalRoute.of(context).settings.arguments;
      //routedData['message'] = "";
      //routedData['morse'] = "";

      //should have 'continuedData' and 'currentMessages'
      print('CONTINUED DATA:');
      print(routedData['continuedData']);

      //List messages;





      //print($messages);

      SizeConfig().init(context);
      return Scaffold(
        backgroundColor: Colors.grey[200],
        appBar: AppBar(
          backgroundColor: Colors.deepOrange,
          title: Text('Inbox'),
          centerTitle: true,
          elevation: 0,
        ),
        body: Center(
          child: ListView.builder(
            itemBuilder: _itemBuilder,
            itemCount: 25,
          ),
        ),
      );
    }
    Widget _itemBuilder(BuildContext context, int index) {
      return GestureDetector(
        onTap: () {
          print("Translate Morse message to English and display");
          Navigator.of(context).pushNamed('/inbox_display', arguments: {
            'selected': routedData['currentMessages'][index]
          });},
        // Jared, when implementing this, you might want to scale the height so that all the text is displayed, or we can limit the characters on the front end
        child: Container(
          height: SizeConfig.blockSizeVertical *6.5,
          //width: SizeConfig.blockSizeHorizontal * 5,
          child: Material(
            color: Colors.grey[200],
            elevation: 7.0,

            child: Center(
              child: Text(
                'from: ' + routedData['currentMessages'][index]['sender'] + 'message: ' + routedData['currentMessages'][index]['morse'],
                //'',//'From {$messages[$index]['sender']} $index: THIS WILL BE MORSE',

                style: TextStyle(
                    color: Colors.deepOrangeAccent,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Montserrat'),
                softWrap: false,
                overflow: TextOverflow.fade,
              ),
            ),
          ),
        ),
      );
    }
  }
