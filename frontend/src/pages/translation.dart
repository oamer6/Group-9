import 'package:flutter/material.dart';

class Translation extends StatefulWidget {
  @override
  _TranslationState createState() => _TranslationState();
}

class _TranslationState extends State<Translation> {

  void getData() {
    //API
  }

  @override
  void initState(){
    super.initState();
    getData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[200],
      appBar: AppBar(
        backgroundColor: Colors.deepOrange,
        title: Text('My Morse'),
        centerTitle: true,
        elevation: 0,
      ),
    body: Center(
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: <Widget>[
            SizedBox(height: 15.0),
            Row(
              children: <Widget>[
                SizedBox(width: 5.0),
                InkWell(
                  onTap: () {
                    Navigator.of(context).pushNamed('/display');
                  },
                  child: Text(
                    'DEBUG ONLY: Go to Display Page',
                    style: TextStyle(
                        color: Colors.deepOrange,
                        fontFamily: 'Montserrat',
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                        decoration: TextDecoration.underline),
                  ),
                ),
              ],
            ),
            TextField(
              textAlign: TextAlign.center,
              textAlignVertical: TextAlignVertical.center,
              decoration: InputDecoration(
                hintText: 'Type a message'
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
                  onTap: () {},
                  child: Center(
                    child: Text(
                      'Translate',
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
        )
      )
    )
    );
  }
}