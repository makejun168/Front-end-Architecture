import exifread
import csv
import os
import json

# latitude lat 纬度
# longitude lon 经度
headers = ['文件夹序号', '图片名称', '纬度', '经度']

rows = []

def getData():
  for p1,p2,p3 in os.walk('./445122MEDIA - 副本'):
    for filename in p3:
      file = open(os.path.join(p1,filename), 'rb') # 获取文件
      nos = p1.split("\\")[-1] # 获取文件夹的序号
      tags = exifread.process_file(file) # 读取文件 获取文件信息
      data = json.loads(tags.get("EXIF UserComment").values) # 获取文件 信息 转化为 json 格式

      # print(nos)# 文件序号
      # print(filename) # 文件名称
      # print(data.get("lat")) # latitude 纬度
      # print(data.get("lon")) # longitude 经度
      
      rows.append([nos,filename,data.get("lat"),data.get("lon")]); # 依次将数据拼接到 excel 表格中
      file.close() # 关闭文件

      # 读写行
      with open('result.xlsx','w',newline='') as f: 
        f_csv = csv.writer(f)
        f_csv.writerow(headers)
        f_csv.writerows(rows)