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

class InboxDisplay extends StatefulWidget {
  @override
  _InboxDisplayState createState() => _InboxDisplayState();
}

class _InboxDisplayState extends State<InboxDisplay>{
  Map data = {};
  String message;

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
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
                  fontSize: SizeConfig.blockSizeVertical *3, fontWeight: FontWeight.bold)),

      )
    );
  }
}