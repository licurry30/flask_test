# Flask
from flask import Flask,render_template,request,url_for
from sqlalchemy import text,create_engine

app = Flask(__name__)

dbur1='mysql+pymysql://root:123456@172.17.0.4:3306/lidc_db'
engine = create_engine(url=dbur1)

@app.route('/')
def login():
    return render_template('manage.html')

@app.route('/PatientSelect')
def PatientSelect():
    return render_template('PatientSelect.html')

@app.route('/InstanceResults/',methods=['POST'])
def InstanceResults():
    if request.method == "POST":
        PatientID = request.get_json()
        print(type(PatientID))
        print(PatientID)
        conn = engine.connect()

        """ 根据PatientID在patien表中查PatientKey """
        sql_0 = text("SELECT PatientKey FROM patient WHERE PatientID='{}'".format(PatientID))
        result_0 = conn.execute(sql_0)
        row_0 = result_0.all()
        PatientKey = row_0[0][0]

        """ 根据PatientKey在analysis表中查询有关该病人的信息 """
        sql_1 = text("SELECT RadiologistID,ImageKey,BadNoduleKey,NonNoduleKey,SmallNoduleKey\
                      FROM analysis WHERE PatientKey={} ORDER BY RadiologistID".format(PatientKey))
        result_1 = conn.execute(sql_1)
        row_1 = result_1.all()

        """ 根据PatientKey在study表中查StudyKey """
        sql_2 = text("SELECT StudyKey FROM study WHERE PatientKey={}".format(PatientKey))
        result_2 = conn.execute(sql_2)
        row_2 = result_2.all()
        StudyKey = row_2[0][0]

        """ 根据StudyKey在series表中查SeriesKey """
        sql_3 = text("SELECT SeriesKey FROM series WHERE StudyKey={}".format(StudyKey))
        result_3 = conn.execute(sql_3)
        row_3 = result_3.all()
        SeriesKey = row_3[0][0]

        conn.close()
        table_head = ['PatientKey','PatientID','StudyKey','SeriesKey','RadiologistID', 
                      'ImageKey','BadNoduleKey','NonNoduleKey','SmallNoduleKey']
        return render_template('InstanceResults.html', Table_head=table_head, PatientKey=PatientKey,
                               PatientID=PatientID,StudyKey=StudyKey,SeriesKey=SeriesKey,Patient=row_1)
    return render_template('InstanceResults.html')


if __name__ == '__main__':
    app.run(port=5002,#host='0.0.0.0',
        debug=True)

