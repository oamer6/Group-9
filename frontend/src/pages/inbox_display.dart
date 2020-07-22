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
  //String message;

  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    print(data);
    data = ModalRoute.of(context).settings.arguments;
    //message = data.toString();
    //message = message.substring(10 ,message.indexOf('}'));

    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.deepOrange,
        title: Text('Message'),
        centerTitle: true,
        elevation: 0,
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
              child: Stack(
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.fromLTRB(15.0, 5.0, 0.0, 0.0),
                      child: Text('from: ' + data['selected']['sender'],
                          style: TextStyle(
                              color: Colors.deepOrange,
                              fontSize: SizeConfig.blockSizeVertical *3, fontWeight: FontWeight.bold)),
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(15.0, 45.0, 0.0, 0.0),
                      child: Text('Morse: ',
                          style: TextStyle(
                              color: Colors.deepOrange,
                              fontSize: SizeConfig.blockSizeVertical *3, fontWeight: FontWeight.bold)),
                    ),
                    Container(
                      padding: EdgeInsets.fromLTRB(15.0, 70.0, 0.0, 0.0),
                      // This should either be scaled or the character allowed for message should be limited
                      child: Text(
                          data['selected']['morse'],
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
                      child: Text(data['selected']['message'],
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