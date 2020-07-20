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

class MorseKey extends StatefulWidget {
  @override
  _MorseKeyState createState() => _MorseKeyState();
}

class _MorseKeyState extends State<MorseKey>{
  @override
  Widget build(BuildContext context) {
    SizeConfig().init(context);
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.deepOrange,
        title: Text('International Morse Key'),
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
              child: Text('A .-\nB -...\nC -.-.\nD -..\nE .\n'
                  'F ..-.\nG --.\nH ....\nI ..\nJ .---\nK -.-\n'
                  'L .-..\nM --\nN -.\nO ---\n',
                  style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: SizeConfig.blockSizeVertical *3.4, fontWeight: FontWeight.bold)),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(100.0, 5.0, 0.0, 0.0),
              child: Text('P .--.\nQ --.-\nR .-.\nS ...\nT -\nU ..-\n'
                  'V ...-\nW .--\nX -..-\nY -.--\nZ --..',
                  style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: SizeConfig.blockSizeVertical *3.4, fontWeight: FontWeight.bold)),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(190.0, 5.0, 0.0, 0.0),
              child: Text('0 -----\n1.----\n2..---\n3 ...--\n'
                  '4 ....-\n5 .....\n6 -....\n7 --...\n8 ---..\n9 ----.',
                  style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: SizeConfig.blockSizeVertical *3.4, fontWeight: FontWeight.bold)),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(290.0, 5.0, 0.0, 0.0),
              child: Text('&  .-...\n\'    .----.\n@ .--.-.\n)   -.--.-\n(   -.--.\n'
                  ':   ---...\n,   --..--\n=  -...-\n!   -.-.--\n.   .-.-.-\n'
                  '-   -....-\n+  .-.-.\n"   .-..-.\n?  ..--..\n/  -..-.',
                  style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: SizeConfig.blockSizeVertical *3.4, fontWeight: FontWeight.bold)),
            ),
    ]
    )
    )
    ]
      )
    );
  }
}