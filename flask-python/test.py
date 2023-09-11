from flask import Flask,render_template
import pymysql
#import mysql.connector

app = Flask(__name__)
# 打开数据库连接
db = pymysql.connect(host='172.17.0.4',
                     port=3306,
                     user='root',
                     password='123456',
                     database='lidc_db')

@app.route('/')
def index():
    
    # 使用 cursor() 方法创建一个游标对象 cursor
    cursor = db.cursor()

    cursor.execute("SHOW TABLES")   
    data = cursor.fetchall()

    cursor.close()

    return render_template('index.html', data=data)
    






if __name__ == '__main__':
    app.run(host='0.0.0.0')
