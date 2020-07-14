import 'package:flutter/material.dart';

class Menu extends StatefulWidget {
  @override
  _MenuState createState() => new _MenuState();
}

class _MenuState extends State<Menu> {

  @override
  Widget build(BuildContext context) {
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
            SizedBox(height: 50.0),
            Container(
              height: 40.0,
              child: Material(
                borderRadius: BorderRadius.circular(20.0),
                color: Colors.deepOrange,
                elevation: 7.0,
                child: GestureDetector(
                  onTap: () {
                    Navigator.of(context).pushNamed('/key');
                  },
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
            SizedBox(height: 15.0),
            Container(
              height: 40.0,
              child: Material(
                borderRadius: BorderRadius.circular(20.0),
                color: Colors.deepOrange,
                elevation: 7.0,
                child: GestureDetector(
                  onTap: () {
                    Navigator.of(context).pushNamed('/translation');
                  },
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
            SizedBox(height: 15.0),
            Container(
              height: 40.0,
              child: Material(
                borderRadius: BorderRadius.circular(20.0),
                color: Colors.deepOrange,
                elevation: 7.0,
                child: GestureDetector(
                  onTap: () {
                    Navigator.of(context).pushNamed('/inbox');
                  },
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