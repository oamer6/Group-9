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

class Menu extends StatefulWidget {
  @override
  _MenuState createState() => new _MenuState();
}

class _MenuState extends State<Menu> {


  Map <String, dynamic> routedData = {};

  @override
  Widget build(BuildContext context) {


    routedData = ModalRoute.of(context).settings.arguments;


    print(routedData);

    SizeConfig().init(context);
    return new Scaffold(
        backgroundColor: Colors.grey[200],
        resizeToAvoidBottomPadding: false,
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              child: Stack(
                children: <Widget>[
                  Container(
                    padding: EdgeInsets.fromLTRB(15.0, 50.0, 0.0, 0.0),
                    child: Text('My',
                        style: TextStyle(
                            color: Colors.deepOrange,
                            fontSize: SizeConfig.blockSizeVertical *12, fontWeight: FontWeight.bold)),
                  ),
                  Container(
                    padding: EdgeInsets.fromLTRB(15.0, 150.0, 0.0, 0.0),
                    child: Text('Morse',
                        style: TextStyle(
                            color: Colors.deepOrange,
                            fontSize: SizeConfig.blockSizeVertical *12, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            ),
            SizedBox(height: SizeConfig.blockSizeVertical *6.5),
            GestureDetector(
              onTap: () {
                Navigator.of(context).pushNamed('/key');
              },
              child : Container(
                height: SizeConfig.blockSizeVertical *6,
                  child: Material(
                    color: Colors.deepOrange,
                    elevation: 7.0,

                      child: Center(
                        child: Text(
                      'International Morse Key',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Montserrat'),
                    ),
                  ),
                ),
              ),
            ),
            SizedBox(height: SizeConfig.blockSizeVertical *2),
            GestureDetector(
              onTap: () {
              Navigator.of(context).pushNamed('/translation', arguments: routedData);
              },
              child: Container(
                height: SizeConfig.blockSizeVertical *6,
                child: Material(
                  color: Colors.deepOrange,
                  elevation: 7.0,


                  child: Center(
                    child: Text(
                      'Translate a Message',
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Montserrat'),
                    ),
                  ),
                ),
              ),
            ),

            SizedBox(height: SizeConfig.blockSizeVertical *2),
            GestureDetector(
                  onTap: () {
                  Navigator.of(context).pushNamed('/loading_inbox', arguments: routedData);
                  },
                child: Container(
                  height: SizeConfig.blockSizeVertical *6,
                  child: Material(
                    color: Colors.deepOrange,
                    elevation: 7.0,
                      child: Center(
                        child: Text(
                      'My Inbox',
                      style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontFamily: 'Montserrat'),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ));
  }
}