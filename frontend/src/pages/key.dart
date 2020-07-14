import 'package:flutter/material.dart';

class MorseKey extends StatefulWidget {
  @override
  _MorseKeyState createState() => _MorseKeyState();
}

class _MorseKeyState extends State<MorseKey>{
  @override
  Widget build(BuildContext context) {
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
                  'L .-..\nM --\nN -.\nO ---\nP .--.\n'
                  'Q --.-\nR .-.\nS ...\nT -\nU ..-\n'
                  'V ...-\nW .--\nX -..-\nY -.--\nZ --..',
                  style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: 20.0, fontWeight: FontWeight.bold)),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(120.0, 5.0, 0.0, 0.0),
              child: Text('0 -----\n1.----\n2..---\n3 ...--\n'
                  '4 ....-\n5 .....\n6 -....\n7 --...\n8 ---..\n9 ----.',
                  style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: 20.0, fontWeight: FontWeight.bold)),
            ),
            Container(
              padding: EdgeInsets.fromLTRB(235.0, 5.0, 0.0, 0.0),
              child: Text('&  .-...\n\'    .----.\n@ .--.-.\n)   -.--.-\n(   -.--.\n'
                  ':   ---...\n,   --..--\n=  -...-\n!   -.-.--\n.   .-.-.-\n'
                  '-   -....-\n+  .-.-.\n"   .-..-.\n?  ..--..\n/  -..-.',
                  style: TextStyle(
                      color: Colors.deepOrange,
                      fontSize: 20.0, fontWeight: FontWeight.bold)),
            ),
    ]
    )
    )
    ]
      )
    );
  }
}