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

class Inbox extends StatefulWidget {
  @override
  _InboxState createState() => _InboxState();
}

class _InboxState extends State<Inbox>{
  int _counter = 0;
  String message = "Hello Morse enthusiasts!";

  void _incrementCounter(){
    setState((){
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
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
    return Container(
      // Jared, when implementing this, you might want to scale the height so that all the text is displayed, or we can limit the characters on the front end
      height: SizeConfig.blockSizeVertical *6.5,
        child: Material(
          color: Colors.grey[200],
          elevation: 7.0,
          child: GestureDetector(
            onTap: () {
              print("Translate Morse message to English and display");
              Navigator.of(context).pushNamed('/inbox_display', arguments: {
                'message': this.message
              });
            },
            child: Center(
              child: Text(
                'From Sender $index: THIS WILL BE MORSE',
                style: TextStyle(
                    color: Colors.deepOrangeAccent,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'Montserrat'),
              ),
            ),
          ),
        ),
      );
  }
}