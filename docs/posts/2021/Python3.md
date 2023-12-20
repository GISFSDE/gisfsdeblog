---
index: 2
icon: markdown
title: Python 学习
date: 2022-06-06
category:
  - Python 学习
tag:
  - Python 学习
---
# TODO
---
+ [ ] 爬虫了解，Python复习
# Python3学习记录

# [简介](https://www.python.org/about/)

    Python is powerful... and fast;
    plays well with others;
    runs everywhere;
    is friendly & easy to learn;
    is Open.

<!-- more -->

## Python 发展历史

## Python 特点

## Python 应用

# 工具

开发平台：PYCharm

# 语法基础

```python
'''
=============基本语法=============
'''
import keyword
# from modname import name1[, name2[, ... nameN]]
# Python 提供了一个办法，把这些定义存放在文件中，为一些脚本或者交互式的解释器实例使用，这个文件被称为模块。
# 模块是一个包含所有你定义的函数和变量的文件，其后缀名是.py。模块可以被别的程序引入，以使用该模块中的函数等功能。这也是使用 python 标准库的方法。
# 从某个模块中导入多个函数,格式为： from somemodule import firstfunc, secondfunc, thirdfunc
# ====__name__属性====
# 一个模块被另一个程序第一次引入时，其主程序将运行。如果我们想在模块被引入时，模块中的某一程序块不执行，我们可以用__name__属性来使该程序块仅在该模块自身运行时执行。
# #!/usr/bin/python3
# # Filename: using_name.py

# if __name__ == '__main__':
#    print('程序自身在运行')
# else:
#    print('我来自另一模块')
# ====dir() 函数====
# 内置的函数 dir() 可以找到模块内定义的所有名称。以一个字符串列表的形式返回:
'''
输入和输出
'''
# Python两种输出值的方式: 表达式语句和 print() 函数。
# 第三种方式是使用文件对象的 write() 方法，标准输出文件可以用 sys.stdout 引用。
# 如果你希望输出的形式更加多样，可以使用 str.format() 函数来格式化输出值。
# 如果你希望将输出的值转成字符串，可以使用 repr() 或 str() 函数来实现。
# str()： 函数返回一个用户易读的表达形式。
# repr()： 产生一个解释器易读的表达形式。
print("Hello word!")
print('{}网址： "{}!"'.format('菜鸟教程', 'www.runoob.com'))
print('{0} 和 {1}'.format('Google', 'Runoob'))
print('站点列表 {0}, {1}, 和 {other}。'.format('Google', 'Runoob', other='Taobao'))
# 读取键盘输入
str = input("请输入：");
print ("你输入的内容是: ", str)
# 读和写文件
# open(filename, mode)
# filename：包含了你要访问的文件名称的字符串值。
# mode：决定了打开文件的模式：只读，写入，追加等。所有可取值见如下的完全列表。这个参数是非强制的，默认文件访问模式为只读(r)。
# 模式	描述
# r	以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。
# rb	以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。
# r+	打开一个文件用于读写。文件指针将会放在文件的开头。
# rb+	以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。
# w	打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。
# wb	以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。
# w+	打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。
# wb+	以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。
# a	打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。
# ab	以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。
# a+	打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。
# ab+	以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。
# 打开一个文件
f = open("/tmp/foo.txt", "w")
f.write( "Python 是一个非常好的语言。\n是的，的确非常好!!\n" )
# f.read(size), 这将读取一定数目的数据, 然后作为字符串或字节对象返回。size 是一个可选的数字类型的参数。 当 size 被忽略了或者为负, 那么该文件的所有内容都将被读取并且返回。
print(f.read())
# 返回一个空字符串, 说明已经已经读取到最后一行。
print(f.readline())
# 返回所有行。
print(f.readlines())
# 将 string 写入到文件中, 然后返回写入的字符数。
f.write("string")
#  返回文件对象当前所处的位置, 它是从文件开头开始算起的字节数。
f.tell()
# 改变文件当前的位置, 可以使用 f.seek(offset, from_what) 函数。
# from_what 的值, 如果是 0 表示开头, 如果是 1 表示当前位置, 2 表示文件的结尾，例如：
# seek(x,0) ： 从起始位置即文件首行首字符开始移动 x 个字符
# seek(x,1) ： 表示从当前位置往后移动x个字符
# seek(-x,2)：表示从文件的结尾往前移动x个字符
# from_what 值为默认为0，即文件开头
# 关闭打开的文件
f.close()

# pickle 模块 实现了基本的数据序列和反序列化。
import pickle
# 使用pickle模块将数据对象保存到文件
data1 = {'a': [1, 2.0, 3, 4+6j],
         'b': ('string', u'Unicode string'),
         'c': None}
selfref_list = [1, 2, 3]
selfref_list.append(selfref_list)
output = open('data.pkl', 'wb')
# Pickle dictionary using protocol 0.
pickle.dump(data1, output)
# Pickle the list using the highest protocol available.
pickle.dump(selfref_list, output, -1)
output.close()
''' 
注释 
'''
"""
注释
"""
# 保留字  关键字end可以用于将结果输出到同一行，或者在输出的末尾添加不同的字符print(b, end=',')
print("保留字", keyword.kwlist)

# 缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数
if True:
    print("ture")
else:
    print('false')

# 多行语句，语句很长，我们可以使用反斜杠(\)来实现多行语句，在 [], {}, 或 () 中的多行语句，不需要使用反斜杠(\)
total = 'item_one' + \
        'item_two' + \
        'item_three'
total1 = ['item_one', 'item_two', 'item_three',
          'item_four', 'item_five']
print(total)
print(total1)

''' 
================基本数据类型===================
Python3 中有六个标准的数据类型：
Number（数字）：int、float、bool、complex（复数）
String（字符串）
List（列表）
Tuple（元组）
Set（集合）
Dictionary（字典）

Python3 的六个标准数据类型中：
不可变数据（3 个）：Number（数字）、String（字符串）、Tuple（元组）；
可变数据（3 个）：List（列表）、Dictionary（字典）、Set（集合）。
 type()查看数据类型，isinstance(a, int)进行判断
'''

# Number（数字）------------------------------------------------------------------------
# int(x) 将x转换为一个整数。
# float(x) 将x转换到一个浮点数。
# complex(x) 将x转换到一个复数，实数部分为 x，虚数部分为 0。
# complex(x, y) 将 x 和 y 转换到一个复数，实数部分为 x，虚数部分为 y。x 和 y 是数字表达式。
# ==数学函数==
# 函数	    返回值 ( 描述 )
# abs(x)	返回数字的绝对值，如abs(-10) 返回 10
# ceil(x)	返回数字的上入整数，如math.ceil(4.1) 返回 5
# cmp(x, y) 如果 x \< y 返回 -1, 如果 x == y 返回 0, 如果 x > y 返回 1。 Python 3 已废弃，使用 (x>y)-(x\<y) 替换。
# exp(x)	返回e的x次幂(ex),如math.exp(1) 返回2.718281828459045
# fabs(x)	返回数字的绝对值，如math.fabs(-10) 返回10.0
# floor(x)	返回数字的下舍整数，如math.floor(4.9)返回 4
# log(x)	如math.log(math.e)返回1.0,math.log(100,10)返回2.0
# log10(x)	返回以10为基数的x的对数，如math.log10(100)返回 2.0
# max(x1, x2,...)	返回给定参数的最大值，参数可以为序列。
# min(x1, x2,...)	返回给定参数的最小值，参数可以为序列。
# modf(x)	返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示。
# pow(x, y)	x**y 运算后的值。
# round(x [,n])	 返回浮点数 x 的四舍五入值，如给出 n 值，则代表舍入到小数点后的位数。其实准确的说是保留值将保留到离上一位更近的一端。
# sqrt(x)	返回数字x的平方根。
# ==随机数函数==
# choice(seq)	从序列的元素中随机挑选一个元素，比如random.choice(range(10))，从0到9中随机挑选一个整数。
# randrange ([start,] stop [,step])	从指定范围内，按指定基数递增的集合中获取一个随机数，基数默认值为 1
# random()	随机生成下一个实数，它在[0,1)范围内。
# seed([x])	改变随机数生成器的种子seed。如果你不了解其原理，你不必特别去设定seed，Python会帮你选择seed。
# shuffle(lst)	将序列的所有元素随机排序
# uniform(x, y)	随机生成下一个实数，它在[x,y]范围内
# ==三角函数==
# Python包括以下三角函数：
# 函数	        描述
# acos(x)	返回x的反余弦弧度值。
# asin(x)	返回x的反正弦弧度值。
# atan(x)	返回x的反正切弧度值。
# atan2(y, x)	返回给定的 X 及 Y 坐标值的反正切值。
# cos(x)	返回x的弧度的余弦值。
# hypot(x, y)	返回欧几里德范数 sqrt(x*x + y*y)。
# sin(x)	返回的x弧度的正弦值。
# tan(x)	返回x弧度的正切值。
# degrees(x)	将弧度转换为角度,如degrees(math.pi/2) ， 返回90.0
# radians(x)	将角度转换为弧度
# ==数学常量==
# 常量	描述
# pi	数学常量 pi（圆周率，一般以π来表示）
# e	    数学常量 e，e即自然常数（自然常数）。
a = b = c = counter = 100  # 同时为多个变量赋值整型变量
d, e, f = 1, 2, "runoob"  # 同时为多个变量赋值不同的值
miles = 1000.0  # 浮点型变量
name = "runoob"  # 字符串

# del语句删除一些对象引用
del a

# 数值运算

Division = 2 / 4  # 除法，得到一个浮点数
Division2 = 2 // 4  # 除法，得到一个整数
remainder = 17 % 3  # 取余
involution = 2 ** 5  # 乘方
print(Division, 'Division')
print(Division2, 'Division2')

# String（字符串）------------------------------------------------------------------------------

# 从后面索引01234567
# 从前面索引-8-7-6-5-4-3-2-1
#         Good boy
# 从前面截取:123456:
# 从后面截取:-6-5-4-3-2-1:
# 反斜杠(\)可以作为续行符，表示下一行是上一行的延续。也可以使用 """...""" 或者 '''...''' 跨越多行
# 用+运算符连接在一起，用*运算符重复

# ==转义字符==
# \(在行尾时)	续行符
# >>> print("line1 \
# ... line2 \
# ... line3")
# line1 line2 line3
# \\	反斜杠符号
# >>> print("\\")
# \
# \'	单引号
# >>> print('\'')
# '
# \"	双引号
# >>> print("\"")
# "
# \a	响铃
# >>> print("\a")执行后电脑有响声。
# \b	退格(Backspace)
# >>> print("Hello \b World!")
# Hello World!
# \000	空
# >>> print("\000")
#
# >>>
# \n	换行
# >>> print("\n")
#
# >>>
# \v	纵向制表符
# >>> print("Hello \v World!")
# Hello
#        World!
# >>>
# \t	横向制表符
# >>> print("Hello \t World!")
# Hello      World!
# >>>
# \r	回车，将 \r 后面的内容移到字符串开头，并逐一替换开头部分的字符，直至将 \r 后面的内容完全替换完成。
# >>> print("Hello\rWorld!")
# World!
# >>> print('google runoob taobao\r123456')
# 123456 runoob taobao
# \f	换页
# >>> print("Hello \f World!")
# Hello
#        World!
# >>>
# \yyy	八进制数，y 代表 0~7 的字符，例如：\012 代表换行。
# >>> print("\110\145\154\154\157\40\127\157\162\154\144\41")
# Hello World!
# \xyy	十六进制数，以 \x 开头，y 代表的字符，例如：\x0a 代表换行
# >>> print("\x48\x65\x6c\x6c\x6f\x20\x57\x6f\x72\x6c\x64\x21")
# Hello World!
# \other	其它的字符以普通格式输出
# ==字符串运算符==
# +	字符串连接	a + b 输出结果： HelloPython
# *	重复输出字符串	a*2 输出结果：HelloHello
# []	通过索引获取字符串中字符	a[1] 输出结果 e
# [ : ]	截取字符串中的一部分，遵循左闭右开原则，str[0:2] 是不包含第 3 个字符的。	a[1:4] 输出结果 ell
# in	成员运算符 - 如果字符串中包含给定的字符返回 True	'H' in a 输出结果 True
# not in	成员运算符 - 如果字符串中不包含给定的字符返回 True	'M' not in a 输出结果 True
# r/R	原始字符串 - 原始字符串：所有的字符串都是直接按照字面的意思来使用，没有转义特殊或不能打印的字符。 原始字符串除在字符串的第一个引号前加上字母 r（可以大小写）以外，与普通字符串有着几乎完全相同的语法。  print( r'\n' ) print( R'\n' )
# %	格式字符串
# ==字符串格式化==
# % c 格式化字符及其ASCII码
# % s 格式化字符串
# % d 格式化整数
# % u 格式化无符号整型
# % o 格式化无符号八进制数
# % x 格式化无符号十六进制数
# % X 格式化无符号十六进制数（大写）
# % f 格式化浮点数字，可指定小数点后的精度
# % e 用科学计数法格式化浮点数
# % E 作用同 % e，用科学计数法格式化浮点数
# % g % f和 % e的简写
# % G % f 和 % E 的简写
# % p 用十六进制数格式化变量的地址
# 格式化操作符辅助指令:
# 符号	功能
# *	定义宽度或者小数点精度
# -	用做左对齐
# +	在正数前面显示加号( + )
# \<sp>	在正数前面显示空格
# #	在八进制数前面显示零('0')，在十六进制前面显示'0x'或者'0X'(取决于用的是'x'还是'X')
# 0	显示的数字前面填充'0'而不是默认的空格
# %	'%%'输出一个单一的'%'
# (var)	映射变量(字典参数)
# m.n.	m 是显示的最小总宽度,n 是小数点后的位数(如果可用的话)

# ==f-string==
name = 'Runoob'
f'Hello {name}'  # 替换变量
'Hello Runoob'
f'{1 + 2}'  # 使用表达式
'3'

w = {'name': 'Runoob', 'url': 'www.runoob.com'}
f'{w["name"]}: {w["url"]}'
'Runoob: www.runoob.com'
para_str = """这是一个多行字符串的实例
多行字符串可以使用制表符
TAB ( \t )。
也可以使用换行符 [ \n ]。
"""
# ==字符串内建函数==

# capitalize()
# 将字符串的第一个字符转换为大写

# center(width, fillchar)
# 返回一个指定的宽度 width 居中的字符串，fillchar 为填充的字符，默认为空格。

# count(str, beg= 0,end=len(string))
# 返回 str 在 string 里面出现的次数，如果 beg 或者 end 指定则返回指定范围内 str 出现的次数

# bytes.decode(encoding="utf-8", errors="strict")
# Python3 中没有 decode 方法，但我们可以使用 bytes 对象的 decode() 方法来解码给定的 bytes 对象，这个 bytes 对象可以由 str.encode() 来编码返回。

# encode(encoding='UTF-8',errors='strict')
# 以 encoding 指定的编码格式编码字符串，如果出错默认报一个ValueError 的异常，除非 errors 指定的是'ignore'或者'replace'

# endswith(suffix, beg=0, end=len(string))
# 检查字符串是否以 obj 结束，如果beg 或者 end 指定则检查指定的范围内是否以 obj 结束，如果是，返回 True,否则返回 False.

# expandtabs(tabsize=8)
# 把字符串 string 中的 tab 符号转为空格，tab 符号默认的空格数是 8 。

# find(str, beg=0, end=len(string))
# 检测 str 是否包含在字符串中，如果指定范围 beg 和 end ，则检查是否包含在指定范围内，如果包含返回开始的索引值，否则返回-1

# index(str, beg=0, end=len(string))
# 跟find()方法一样，只不过如果str不在字符串中会报一个异常。

# isalnum()
# 如果字符串至少有一个字符并且所有字符都是字母或数字则返 回 True，否则返回 False

# isalpha()
# 如果字符串至少有一个字符并且所有字符都是字母或中文字则返回 True, 否则返回 False

# isdigit()
# 如果字符串只包含数字则返回 True 否则返回 False..

# islower()
# 如果字符串中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是小写，则返回 True，否则返回 False

# isnumeric()
# 如果字符串中只包含数字字符，则返回 True，否则返回 False

# isspace()
# 如果字符串中只包含空白，则返回 True，否则返回 False.

# istitle()
# 如果字符串是标题化的(见 title())则返回 True，否则返回 False

# isupper()
# 如果字符串中包含至少一个区分大小写的字符，并且所有这些(区分大小写的)字符都是大写，则返回 True，否则返回 False

# join(seq)
# 以指定字符串作为分隔符，将 seq 中所有的元素(的字符串表示)合并为一个新的字符串

# len(string)
# 返回字符串长度

# ljust(width[, fillchar])
# 返回一个原字符串左对齐,并使用 fillchar 填充至长度 width 的新字符串，fillchar 默认为空格。

# lower()
# 转换字符串中所有大写字符为小写.

# lstrip()
# 截掉字符串左边的空格或指定字符。

# maketrans()
# 创建字符映射的转换表，对于接受两个参数的最简单的调用方式，第一个参数是字符串，表示需要转换的字符，第二个参数也是字符串表示转换的目标。

# max(str)
# 返回字符串 str 中最大的字母。

# min(str)
# 返回字符串 str 中最小的字母。

# replace(old, new [, max])
# 把 将字符串中的 old 替换成 new,如果 max 指定，则替换不超过 max 次。

# rfind(str, beg=0,end=len(string))
# 类似于 find()函数，不过是从右边开始查找.

# rindex( str, beg=0, end=len(string))
# 类似于 index()，不过是从右边开始.

# rjust(width,[, fillchar])
# 返回一个原字符串右对齐,并使用fillchar(默认空格）填充至长度 width 的新字符串

# rstrip()
# 删除字符串末尾的空格或指定字符。

# split(str="", num=string.count(str))
# 以 str 为分隔符截取字符串，如果 num 有指定值，则仅截取 num+1 个子字符串

# splitlines([keepends])
# 按照行('\r', '\r\n', \n')分隔，返回一个包含各行作为元素的列表，如果参数 keepends 为 False，不包含换行符，如果为 True，则保留换行符。

# startswith(substr, beg=0,end=len(string))
# 检查字符串是否是以指定子字符串 substr 开头，是则返回 True，否则返回 False。如果beg 和 end 指定值，则在指定范围内检查。

# strip([chars])
# 在字符串上执行 lstrip()和 rstrip()

# swapcase()
#  将字符串中大写转换为小写，小写转换为大写

# title()
# 返回"标题化"的字符串,就是说所有单词都是以大写开始，其余字母均为小写(见 istitle())

# translate(table, deletechars="")
# 根据 str 给出的表(包含 256 个字符)转换 string 的字符, 要过滤掉的字符放到 deletechars 参数中

# upper()
# 转换字符串中的小写字母为大写

# zfill (width)
# 返回长度为 width 的字符串，原字符串右对齐，前面填充0

# isdecimal()
# 检查字符串是否只包含十进制字符，如果是返回 true，否则返回 false。
str = 'Lxl is a good boy'
print(str)  # 输出字符串
print(str[0:-1])  # 输出第一个到倒数第二个的所有字符
print(str[0])  # 输出字符串第一个字符
print(str[2:5])  # 输出从第三个开始到第五个的字符
print(str[2:])  # 输出从第三个开始的后的所有字符
print(str * 2)  # 输出字符串两次，也可以写成 print (2 * str)
print(str + "TEST")  # 连接字符串
# 转义
print('Ru\noob')
# 不转义字符串前加r
print(2 * r'Ru\noob')


# List（列表）------------------------------------------------------------------------------
# 创建列表只需要方括号括起来，里面数据类型可不一致，索引正0反-1，
# 列表中的元素是可以改变的
# append() 追加  del 删除
# ==列表脚本操作符==
# Python 表达式	                              结果	             描述
# len([1, 2, 3])	                        3	                 长度
# [1, 2, 3] + [4, 5, 6]	                    [1, 2, 3, 4, 5, 6]	    组合
# ['Hi!'] * 4	                             ['Hi!', 'Hi!', 'Hi!', 'Hi!']	重复
# 3 in [1, 2, 3]	                        True	        元素是否存在于列表中
# for x in [1, 2, 3]: print(x, end=" ")	    1 2 3	迭代
# ==函数&方法==
# len(list) 列表元素个数
# max(list) 返回列表元素最大值
# min(list) 返回列表元素最小值
# list(seq) 将元组转换为列表
# 1	list.append(obj) 在列表末尾添加新的对象
# 2	list.count(obj) 统计某个元素在列表中出现的次数
# 3	list.extend(seq) 在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）
# 4	list.index(obj) 从列表中找出某个值第一个匹配项的索引位置
# 5	list.insert(index, obj) 将对象插入列表
# 6	list.pop([index=-1]) 移除列表中的一个元素（默认最后一个元素），并且返回该元素的值
# 7	list.remove(obj) 移除列表中某个值的第一个匹配项
# 8	list.reverse() 反向列表中元素
# 9	list.sort( key=None, reverse=False) 对原列表进行排序
# 10 list.clear() 清空列表
# 11 list.copy() 复制列表
lists = ['1', '2', '3', '4', '5']
print(lists[:])
print(lists[:3])
print(lists[1:3])
print(lists[4:])
print(lists[-1:])
print(lists[:-2])
print(lists * 3)  # 输出多次列表
print(lists + lists)  # 连接列表
for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)

def reverseWords(input):
    # 通过空格将字符串分隔符，把各个单词分隔为列表
    inputWords = input.split(" ")

    # 翻转字符串
    # 假设列表 list = [1,2,3,4],
    # list[0]=1, list[1]=2 ，而 -1 表示最后一个元素 list[-1]=4 ( 与 list[3]=4 一样)
    # inputWords[-1::-1] 有三个参数
    # 第一个参数 -1 表示最后一个元素
    # 第二个参数为空，表示移动到列表末尾
    # 第三个参数为步长，-1 表示逆向
    inputWords = inputWords[-1::-1]

    # 重新组合字符串
    output = ' '.join(inputWords)

    return output


if __name__ == "__main__":
    input = 'I like runoob'
    rw = reverseWords(input)
    print(rw)

# Tuple（元组）--------------------------------------------------------------------
# 元组（tuple）与列表类似，不同之处在于元组的元素不能修改，其使用小括号（）或不要括号，
# 但它可以包含可变的对象，可以连接组合成新元祖，元素不允许删除但可以使用del删除整个元祖。
# string、list 和 tuple 都属于 sequence（序列）。
# 当元祖只有一个元素时，后面添加逗号，否则括号会被当做运算符使用，tup1 = (50)为整型，tup1 = (50，)为元祖
# ==元祖运算符==
# Python 表达式	        结果	                     描述
# len((1, 2, 3))	        3	                 计算元素个数
# (1, 2, 3) + (4, 5, 6)	    (1, 2, 3, 4, 5, 6)	    连接
# ('Hi!',) * 4  	('Hi!', 'Hi!', 'Hi!', 'Hi!')	复制
# 3 in (1, 2, 3)	        True	            元素是否存在
# for x in (1, 2, 3): print (x,)	1 2 3	        迭代
# ==内置函数==
# len(tuple) 计算元组元素个数。
# max(tuple) 返回元组中元素最大值。
# min(tuple) 返回元组中元素最小值。
# tuple(iterable) 将可迭代系列转换为元组。
tuple = ('abcd', 786, 2.23, 'runoob', 70.2)
tinytuple = (123, 'runoob')

print(tuple)  # 输出完整元组
print(tuple[0])  # 输出元组的第一个元素
print(tuple[1:3])  # 输出从第二个元素开始到第三个元素
print(tuple[2:])  # 输出从第三个元素开始的所有元素
print(tinytuple * 2)  # 输出两次元组
print(tuple + tinytuple)  # 连接元组

# Set（集合）----------------------------------------------------------------------
# 创建一个空集合必须用 set() 而不是 { }，因为 { } 是用来创建一个空字典
sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}
sites1 = {}
sites2 = ()
set()
# # 添加元素，重复不操作
# sites1.add("1")
# # 可以添加列表，元祖字典等
# sites1.update("1")
# print(sites)  # 输出集合，重复的元素被自动去掉
# # 移除，不存在报错
# sites1.remove( x )
# # 移除，不存在不报错
# sites1.discard( x )
# # 随机删除
# sites1.pop()
# # 长度
# len(sites1)
# # 清空
# sites1.clear()
# # 判断是否存在
# x in s
# ==内置方法完整列表==
# add()	为集合添加元素
# clear()	移除集合中的所有元素
# copy()	拷贝一个集合
# difference()	返回多个集合的差集
# difference_update()	移除集合中的元素，该元素在指定的集合也存在。
# discard()	删除集合中指定的元素
# intersection()	返回集合的交集
# intersection_update()	返回集合的交集。
# isdisjoint()	判断两个集合是否包含相同的元素，如果没有返回 True，否则返回 False。
# issubset()	判断指定集合是否为该方法参数集合的子集。
# issuperset()	判断该方法的参数集合是否为指定集合的子集
# pop()	随机移除元素
# remove()	移除指定元素
# symmetric_difference()	返回两个集合中不重复的元素集合。
# symmetric_difference_update()	移除当前集合中在另外一个指定集合相同的元素，并将另外一个指定集合中不同的元素插入到当前集合中。
# union()	返回两个集合的并集
# update()	给集合添加元素

# 成员测试
if 'Runoob' in sites:
    print('Runoob 在集合中')
else:
    print('Runoob 不在集合中')

# set可以进行集合运算
a = set('abracadabra')
b = set('alacazam')

print(a)
print(a - b)  # a 和 b 的差集
print(a | b)  # a 和 b 的并集
print(a & b)  # a 和 b 的交集
print(a ^ b)  # a 和 b 中不同时存在的元素

# Dictionary（字典）------------------------------------------------------------------
# 字典（dictionary）是Python中另一个非常有用的内置数据类型。
# 列表是有序的对象集合，字典是无序的对象集合。两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。
# 字典是一种映射类型，字典用 { } 标识，它是一个无序的 键(key) : 值(value) 的集合。
# 键(key)可以是任意类型，但必须使用不可变类型。
# 在同一个字典中，键(key)必须是唯一的。
# ==内置函数==
# len(dict) 计算字典元素个数，即键的总数。
# str(dict) 输出字典，以可打印的字符串表示。
# type(variable) 返回输入的变量类型，如果变量是字典就返回字典类型。
# ==内置方法==
# 1	radiansdict.clear() 删除字典内所有元素
# 2	radiansdict.copy()  返回一个字典的浅复制
# 3	radiansdict.fromkeys()  创建一个新字典，以序列seq中元素做字典的键，val为字典所有键对应的初始值
# 4	radiansdict.get(key, default=None)  返回指定键的值，如果键不在字典中返回 default 设置的默认值
# 5	key in dict 如果键在字典dict里返回true，否则返回false
# 6	radiansdict.items() 以列表返回一个视图对象
# 7	radiansdict.keys() 返回一个视图对象
# 8	radiansdict.setdefault(key, default=None)  和get()类似, 但如果键不存在于字典中，将会添加键并将值设为default
# 9	radiansdict.update(dict2) 把字典dict2的键/值对更新到dict里
# 10 radiansdict.values() 返回一个视图对象
# 11 pop(key[,default])  删除字典给定键 key 所对应的值，返回值为被删除的值。key值必须给出。 否则，返回default值。
# 12 popitem()  随机返回并删除字典中的最后一对键和值
dict = {}
dict['one'] = "1 - 菜鸟教程"
dict[2] = "2 - 菜鸟工具"

tinydict = {'name': 'runoob', 'code': 1, 'site': 'www.runoob.com'}


for k, v in knights.items():
     print(k, v)
print(dict['one'])  # 输出键为 'one' 的值
print(dict[2])  # 输出键为 2 的值
print(tinydict)  # 输出完整的字典
print(tinydict.keys())  # 输出所有键
print(tinydict.values())  # 输出所有值
del tinydict['name'] # 删除键 'name'
dict.clear()     # 清空字典
del tinydict         # 删除字典
# 构造函数 dict() 可以直接从键值对序列中构建字典如下


'''
============数据类型转换===============
'''
# int(x [,projects]) 将x转换为一个整数
# float(x)将x转换到一个浮点数
# complex(real [,imag])创建一个复数
# str(x)将对象 x 转换为字符串
# repr(x)将对象 x 转换为表达式字符串
# eval(str)用来计算在字符串中的有效Python表达式,并返回一个对象
# tuple(s)将序列 s 转换为一个元组
# list(s)将序列 s 转换为一个列表
# set(s)转换为可变集合
# dict(d)创建一个字典。d 必须是一个 (key, value)元组序列。
# frozenset(s)转换为不可变集合
# chr(x)将一个整数转换为一个字符
# ord(x)将一个字符转换为它的整数值
# hex(x)将一个整数转换为一个十六进制字符串
# oct(x)将一个整数转换为一个八进制字符串

'''
============Python3运算符===============
'''
# 算术运算符【a为10，b为21】----------------------------------
# +	加 - 两个对象相加	                        a + b 输出结果 31
# -	减 - 得到负数或是一个数减去另一个数	        a - b 输出结果 -11
# *	乘 - 两个数相乘或是返回一个被重复若干次的字符串	a * b 输出结果 210
# /	除 - x 除以 y	                        b / a 输出结果 2.1
# %	取模 - 返回除法的余数	                    b % a 输出结果 1
# **	幂 - 返回x的y次幂	                    a**b 为10的21次方
# //	取整除 - 向下取接近商的整数，除后取小      9//2=4   -9//2=-5

# 比较（关系）运算符【a为10，b为20】-----------------------------
# ==	等于 - 比较对象是否相等	        (a == b) 返回 False。
# !=	不等于 - 比较两个对象是否不相等	(a != b) 返回 True。
# >	    大于 - 返回x是否大于y	        (a > b) 返回 False。
# \<	    小于 - 返回x是否小于y。所有比较运算符返回1表示真，返回0表示假。这分别与特殊的变量True和False等价。注意，这些变量名的大写。	(a \< b) 返回 True。
# >=	大于等于 - 返回x是否大于等于y。	(a >= b) 返回 False。
# \<=	小于等于 - 返回x是否小于等于y。	(a \<= b) 返回 True。

# 赋值运算符【a为10，b为20】----------------------------------
# =	简单的赋值运算符	c = a + b 将 a + b 的运算结果赋值为 c
# +=	加法赋值运算符	c += a 等效于 c = c + a
# -=	减法赋值运算符	c -= a 等效于 c = c - a
# *=	乘法赋值运算符	c *= a 等效于 c = c * a
# /=	除法赋值运算符	c /= a 等效于 c = c / a
# %=	取模赋值运算符	c %= a 等效于 c = c % a
# **=	幂赋值运算符	c **= a 等效于 c = c ** a
# //=	取整除赋值运算符	c //= a 等效于 c = c // a
# :=    海象运算符，可在表达式内部为变量赋值。Python3.8 版本新增运算符。
# 在这个示例中，赋值表达式可以避免调用 len() 两次:
# if (n := len(a)) > 10:
#     print(f"List is too long ({n} elements, expected \<= 10)")

# 逻辑运算符-----------------------------------------------------
# and	x and y	布尔"与" - 如果 x 为 False，x and y 返回 x 的值，否则返回 y 的计算值。	(a and b) 返回 20。
# or	x or y	布尔"或" - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值。	(a or b) 返回 10。
# not	not x	布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。	not(a and b) 返回 False

# 位运算符-------------------------------------------------------
# &	按位与运算符：参与运算的两个值,如果两个相应位都为1,则该位的结果为1,否则为0	(a & b) 输出结果 12 ，二进制解释： 0000 1100
# |	按位或运算符：只要对应的二个二进位有一个为1时，结果位就为1。	(a | b) 输出结果 61 ，二进制解释： 0011 1101
# ^	按位异或运算符：当两对应的二进位相异时，结果为1	(a ^ b) 输出结果 49 ，二进制解释： 0011 0001
# ~	按位取反运算符：对数据的每个二进制位取反,即把1变为0,把0变为1。~x 类似于 -x-1	(~a ) 输出结果 -61 ，二进制解释： 1100 0011， 在一个有符号二进制数的补码形式。
# \<\<	左移动运算符：运算数的各二进位全部左移若干位，由"\<\<"右边的数指定移动的位数，高位丢弃，低位补0。	a \<\< 2 输出结果 240 ，二进制解释： 1111 0000
# >>	右移动运算符：把">>"左边的运算数的各二进位全部右移若干位，">>"右边的数指定移动的位数	a >> 2 输出结果 15 ，二进制解释： 0000 1111

# 成员运算符----------------------------------------------------------
# in	如果在指定的序列中找到值返回 True，否则返回 False。	x 在 y 序列中 , 如果 x 在 y 序列中返回 True。
# not in	如果在指定的序列中没有找到值返回 True，否则返回 False。	x 不在 y 序列中 , 如果 x 不在 y 序列中返回 True。

# 身份运算符------------------------------------------------------------
# is	is 是判断两个标识符是不是引用自一个对象	x is y, 类似 id(x) == id(y) , 如果引用的是同一个对象则返回 True，否则返回 False
# is not	is not 是判断两个标识符是不是引用自不同对象	x is not y ， 类似 id(a) != id(b)。如果引用的不是同一个对象则返回结果 True，否则返回 False。

# 运算符优先级
# **	指数 (最高优先级)
# ~ + -	按位翻转, 一元加号和减号 (最后两个的方法名为 +@ 和 -@)
# * / % //	乘，除，求余数和取整除
# + -	加法减法
# >> \<\<	右移，左移运算符
# &	位 'AND'
# ^ |	位运算符
# \<= \< > >=	比较运算符
# == !=	等于运算符
# = %= /= //= -= += *= **=	赋值运算符
# is is not	身份运算符
# in not in	成员运算符
# not and or	逻辑运算符

```

# 流程控制

```python
'''
流程控制
'''
# if
if condition_1:
    statement_block_1
elif condition_2:
    statement_block_2
else:
    statement_block_3

# while whlie后面为false时则执行else语句块
while counter \<= n:
    sum = sum + counter
    counter += 1
else:
    additional_statement(s)

# for range()函数。它会生成数列
# break 语句可以跳出 for 和 while 的循环体。如果你从 for 或 while 循环中终止，任何对应的循环 else 块将不执行。
# continue 语句被用来告诉 Python 跳过当前循环块中的剩余语句，然后继续进行下一轮循环。
for i in range(5,9) :
    print(i)

# pass 不做任何事情，一般用做占位语句
for letter in 'Runoob':
    if letter == 'o':
        pass
        print('执行 pass 块')
    print('当前字母 :', letter)

print("Good bye!")

'''
迭代器与生成器 
 iter()创建迭代器对象 和 next()输出迭代器下一个元素   Python 的构造函数为 __init__(),__iter__() 方法返回一个特殊的迭代器对象， 这个迭代器对象实现了 __next__() 方法并通过 StopIteration 异常标识迭代的完成。
__next__() 方法（Python 2 里是 next()）会返回下一个迭代器对象。
'''

# StopIteration 异常用于标识迭代的完成，防止出现无限循环的情况，在 __next__() 方法中我们可以设置在完成指定循环次数后触发 StopIteration 异常来结束迭代。
class MyNumbers:
    def __iter__(self):
        self.a = 1
        return self

    def __next__(self):
        if self.a \<= 20:
            x = self.a
            self.a += 1
            return x
        else:
            raise StopIteration


myclass = MyNumbers()
myiter = iter(myclass)

for x in myiter:
    print(x)
# 使用了 yield 的函数被称为生成器（generator）。
# 跟普通函数不同的是，生成器是一个返回迭代器的函数，只能用于迭代操作，更简单点理解生成器就是一个迭代器。
#
# 在调用生成器运行的过程中，每次遇到 yield 时函数会暂停并保存当前所有的运行信息，返回 yield 的值, 并在下一次执行 next() 方法时从当前位置继续运行。
#
# 调用一个生成器函数，返回的是一个迭代器对象。
import sys


def fibonacci(n):  # 生成器函数 - 斐波那契
    a, b, counter = 0, 1, 0
    while True:
        if (counter > n):
            return
        yield a
        a, b = b, a + b
        counter += 1


f = fibonacci(10)  # f 是一个迭代器，由生成器返回生成

while True:
    try:
        print(next(f), end=" ")
    except StopIteration:
        sys.exit()
```

# 时间

```python
"""
时间
"""
# Python 提供了一个 time 和 calendar 模块可以用于格式化日期和时间。
# 时间间隔是以秒为单位的浮点小数。
# 每个时间戳都以自从 1970 年 1 月 1 日午夜（历元）经过了多长时间来表示。

import time  # 引入time模块

ticks = time.time()
print ("当前时间戳为:", ticks)

# 时间元组
# 很多Python函数用一个元组装起来的9组数字处理时间:
#
# 序号   字段 值
# 0        4位数年   2008
# 1        月  1 到 12
# 2        日  1到31
# 3        小时 0到23
# 4        分钟 0到59
# 5        秒  0到61 (60或61 是闰秒)
# 6        一周的第几日 0到6 (0是周一)
# 7        一年的第几日 1到366 (儒略历)
# 8        夏令时    -1, 0, 1, -1是决定是否为夏令时的旗帜
# 上述也就是struct_time元组。这种结构具有如下属性：
# 序号   属性     值
# 0        tm_year    2008
# 1        tm_mon 1 到 12
# 2        tm_mday    1 到 31
# 3        tm_hour    0 到 23
# 4        tm_min 0 到 59
# 5        tm_sec 0 到 61 (60或61 是闰秒)
# 6        tm_wday    0到6 (0是周一)
# 7        tm_yday    一年中的第几天，1 到 366
# 8        tm_isdst   是否为夏令时，值有：1(夏令时)、0(不是夏令时)、-1(未知)，默认 -1

# 获取当前时间
localtime = time.asctime( time.localtime(time.time()) )
print ("本地时间为 :", localtime)
# 格式化
# %y 两位数的年份表示（00-99）
# %Y 四位数的年份表示（000-9999）
# %m 月份（01-12）
# %d 月内中的一天（0-31）
# %H 24小时制小时数（0-23）
# %I 12小时制小时数（01-12）
# %M 分钟数（00=59）
# %S 秒（00-59）
# %a 本地简化星期名称
# %A 本地完整星期名称
# %b 本地简化的月份名称
# %B 本地完整的月份名称
# %c 本地相应的日期表示和时间表示
# %j 年内的一天（001-366）
# %p 本地A.M.或P.M.的等价符
# %U 一年中的星期数（00-53）星期天为星期的开始
# %w 星期（0-6），星期天为星期的开始
# %W 一年中的星期数（00-53）星期一为星期的开始
# %x 本地相应的日期表示
# %X 本地相应的时间表示
# %Z 当前时区的名称
# %% %号本身
print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))

# 格式化成Sat Mar 28 22:24:24 2016形式
print(time.strftime("%a %b %d %H:%M:%S %Y", time.localtime()))

# 将格式字符串转换为时间戳
a = "Sat Mar 28 22:24:24 2016"
print(time.mktime(time.strptime(a, "%a %b %d %H:%M:%S %Y")))

# 获取某月日历
import calendar

cal = calendar.month(2016, 1)
print ("以下输出2016年1月份的日历:")
print (cal)
```

# JSON

```python
"""
JSON
"""
# json.dumps(): ==编码==
# dict                                      object
# list, tuple                               array
# str                                       string
# int, float, int- & float-derived Enums    number
# True                                      true
# False                                         false
# None                                       null
# json.loads(): ==解码==
# object       dict
# array        list
# string       str
# number (int) int
# number (real)    float
# true         True
# false            False
# null         None
import json

# Python 字典类型转换为 JSON 对象
data = {
    'no': 1,
    'name': 'Runoob',
    'url': 'http://www.runoob.com'
}

json_str = json.dumps(data)
print("Python 原始数据：", repr(data))
print("JSON 对象：", json_str)
# 将 JSON 对象转换为 Python 字典
data2 = json.loads(json_str)
print ("data2['name']: ", data2['name'])
print ("data2['url']: ", data2['url'])

# 文件处理
# 写入 JSON 数据
with open('data.json', 'w') as f:
    json.dump(data, f)

# 读取数据
with open('data.json', 'r') as f:
    data = json.load(f)
```

# 标准库概览

```python
"""
标准库概览
"""
# 操作系统接口-----------------------------
import os

os.getcwd()  # 返回当前的工作目录
os.chdir('/server/accesslogs')  # 修改当前的工作目录
os.system('mkdir today')  # 执行系统命令 mkdir
import shutil

shutil.copyfile('data.db', 'archive.db')
shutil.move('/build/executables', 'installdir')
# 文件通配符 ---------------------------------------------
# 用于从目录通配符搜索中生成文件列表
import glob

glob.glob('*.py')
# 命令行参数------------------------------------
import sys

print(sys.argv)
# 错误输出重定向和程序终止-------------------------------
# sys 还有 stdin，stdout 和 stderr 属性，即使在 stdout 被重定向时，后者也可以用于显示警告和错误信息。
sys.stderr.write('Warning, log file not found starting a new one\n')
# 字符串正则匹配-----------------------------------------------
import re
re.findall(r'\bf[a-z]*', 'which foot or hand fell fastest')
re.sub(r'(\b[a-z]+) \1', r'\1', 'cat in the the hat')
# 数学-----------------------------------------------
import math
math.cos(math.pi / 4)
math.log(1024, 2)
import random
random.choice(['apple', 'pear', 'banana'])
random.sample(range(100), 10)   # sampling without replacement
random.random()    # random float
random.randrange(6)
# 互联网-----------------------------------------------
from urllib.request import urlopen
for line in urlopen('http://tycho.usno.navy.mil/cgi-bin/timer.pl'):
    line = line.decode('utf-8')  # Decoding the binary data to text.
    if 'EST' in line or 'EDT' in line:  # look for Eastern Time
        print(line)



import smtplib
server = smtplib.SMTP('localhost')
server.sendmail('soothsayer@example.org', 'jcaesar@example.org',
"""To: jcaesar@example.org
...From: soothsayer@example.org
...
... Beware the Ides of March.
... """)
server.quit()
# 日期和时间-----------------------------------------------
from datetime import date
now = date.today()
print(now)
now.strftime("%m-%d-%y. %d %b %Y is a %A on the %d day of %B.")

# dates support calendar arithmetic
birthday = date(1964, 7, 31)
age = now - birthday
age.days
# 数据压缩
import zlib
s = b'witch which has which witches wrist watch'
len(s)
t = zlib.compress(s)
len(t)
zlib.decompress(t)
zlib.crc32(s)
# 性能度量
from timeit import Timer
Timer('t=a; a=b; b=t', 'a=1; b=2').timeit()
Timer('a,b = b,a', 'a=1; b=2').timeit()
# 测试模块
def average(values):
    """Computes the arithmetic mean of a list of numbers.

    >>> print(average([20, 30, 70]))
    40.0
    """
    return sum(values) / len(values)

import doctest
doctest.testmod()   # 自动验证嵌入测试
# unittest模块不像 doctest模块那么容易使用，不过它可以在一个独立的文件里提供一个更全面的测试集:

import unittest

class TestStatisticalFunctions(unittest.TestCase):

    def test_average(self):
        self.assertEqual(average([20, 30, 70]), 40.0)
        self.assertEqual(round(average([1, 5, 7]), 1), 4.3)
        self.assertRaises(ZeroDivisionError, average, [])
        self.assertRaises(TypeError, average, 20, 30, 70)

unittest.main() # Calling from the command line invokes all tests
```

# OOP

```python
"""
OOP
"""


# ===类===
# class ClassName:
#     \<statement-1>
#     .
#     .
#     \<statement-N>
# ===类对象===
# 属性引用和实例化
class MyClass:
    """一个简单的类实例"""
    i = 12345

    def f(self):
        return 'hello world'


# ===实例化类===
x = MyClass()

# ===访问类的属性和方法===
print("MyClass 类的属性 i 为：", x.i)
print("MyClass 类的方法 f 输出为：", x.f())


# 类有一个名为 __init__() 的特殊方法（构造方法），该方法在类实例化时会自动调用，像下面这样：
# __init__() 方法可以有参数，参数通过 __init__() 传递到类的实例化操作上，self代表类的实例，而非类
def __init__(self):
    self.data = []


class Test:
    def prt(self):
        print(self)
        print(self.__class__)


t = Test()
t.prt()


# ===方法===
# def定义方法,与一般函数定义不同，类方法必须包含self参数且作为第一个参数，self代表类的实例
# 类定义
class people:
    # 定义基本属性
    name = ''
    age = 0
    # 定义私有属性,私有属性在类外部无法直接进行访问
    __weight = 0

    # 定义构造方法
    def __init__(self, n, a, w):
        self.name = n
        self.age = a
        self.__weight = w

    def speak(self):
        print("%s 说: 我 %d 岁。" % (self.name, self.age))


# 实例化类
p = people('runoob', 10, 30)
p.speak()


# ===继承===
# 子类（派生类 DerivedClassName）会继承父类（基类 BaseClassName）的属性和方法。
# class DerivedClassName(BaseClassName):
#     \<statement-1>
#     .
#     .
#     .
#     \<statement-N>
# ===多继承===
# class DerivedClassName(Base1, Base2, Base3):
#     \<statement-1>
#     .
#     .
#     .
#     \<statement-N>
# 若是父类中有相同的方法名，而在子类使用时未指定，python从左至右搜索 即方法在子类中未找到时，从左到右查找父类中是否包含方法
# ===方法重写===
class Parent:  # 定义父类
    def myMethod(self):
        print('调用父类方法')


class Child(Parent):  # 定义子类
    def myMethod(self):
        print('调用子类方法')


c = Child()  # 子类实例
c.myMethod()  # 子类调用重写方法
super(Child, c).myMethod()  # 用子类对象调用父类已被覆盖的方法


# ===类属性与方法===
# 类的私有属性
# __private_attrs：两个下划线开头，声明该属性为私有，不能在类的外部被使用或直接访问。在类内部的方法中使用时 self.__private_attrs。
#
# 类的方法
# 在类的内部，使用 def 关键字来定义一个方法，与一般函数定义不同，类方法必须包含参数 self，且为第一个参数，self 代表的是类的实例。
# self 的名字并不是规定死的，也可以使用 this，但是最好还是按照约定使用 self。
#
# 类的私有方法
# __private_method：两个下划线开头，声明该方法为私有方法，只能在类的内部调用 ，不能在类的外部调用。self.__private_methods。

# ==重载==
class Vector:
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def __str__(self):
        return 'Vector (%d, %d)' % (self.a, self.b)

    def __add__(self, other):
        return Vector(self.a + other.a, self.b + other.b)


v1 = Vector(2, 10)
v2 = Vector(5, -2)
print(v1 + v2)
```

# 函数

```python
'''
函数
'''


# 你可以定义一个由自己想要功能的函数，以下是简单的规则：
#
# 函数代码块以 def 关键词开头，后接函数标识符名称和圆括号 ()。
# 任何传入参数和自变量必须放在圆括号中间，圆括号之间可以用于定义参数。
# 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。
# 函数内容以冒号 : 起始，并且缩进。
# return [表达式] 结束函数，选择性地返回一个值给调用方，不带表达式的 return 相当于返回 None。
def max(a, b):
    if a > b:
        return a
    else:
        return b


# python 函数的参数传递：
# 不可变类型：类似 C++ 的值传递，如整数、字符串、元组。如 fun(a)，传递的只是 a 的值，没有影响 a 对象本身。如果在 fun(a) 内部修改 a 的值，则是新生成一个 a 的对象。
# 可变类型：类似 C++ 的引用传递，如 列表，字典。如 fun(la)，则是将 la 真正的传过去，修改后 fun 外部的 la 也会受影响
# python 中一切都是对象，严格意义我们不能说值传递还是引用传递，我们应该说传不可变对象和传可变对象。
# 可通过id()函数查看对象内存地址

# 参数
# 以下是调用函数时可使用的正式参数类型：
# 必需参数【调用时的数量必须和声明时的一样】 def printme( str ):
# 关键字参数【允许函数调用时参数的顺序与声明时不一致，因为 Python 解释器能够用参数名匹配参数值】def printinfo( name, age ):
# 默认参数【如果没有传递参数，则会使用默认参数】def printinfo( name, age = 35 ):
# 不定长参数 【加了星号 * 的参数会以元组(tuple)的形式导入，存放所有未命名的变量参数，没有指定参数，它就是一个空元组。我们也可以不向函数传递未命名的变量，加了两个星号 ** 的参数会以字典的形式导入，如果单独出现星号 * 后的参数必须用关键字传入】def functionname([formal_args,] *var_args_tuple ):

'''
匿名函数
'''
# lambda [arg1 [,arg2,.....argn]]:expression
# 可写函数说明
sum = lambda arg1, arg2: arg1 + arg2

# 调用sum函数
print("相加后的值为 : ", sum(10, 20))
print("相加后的值为 : ", sum(20, 20))
'''
强制位置参数
'''


# 在以下的例子中，形参 a 和 b 必须使用指定位置参数，c 或 d 可以是位置形参或关键字形参，而 e 或 f 要求为关键字形参:
def f(a, b, /, c, d, *, e, f):
    print(a, b, c, d, e, f)


# 以下使用方法是正确的:

f(10, 20, 30, d=40, e=50, f=60)
# 以下使用方法会发生错误:

f(10, b=20, c=30, d=40, e=50, f=60)  # b 不能使用关键字参数的形式
f(10, 20, 30, 40, 50, f=60)  # e 必须使用关键字参数的形式
```

# 文件

```python
"""
文件
"""
# 打开文件返回文件对象
# file: 必需，文件路径（相对或者绝对路径）。
# mode: 可选，文件打开模式
# buffering: 设置缓冲
# encoding: 一般使用utf8
# errors: 报错级别
# newline: 区分换行符
# closefd: 传入的file参数类型
# opener: 设置自定义开启器，开启器的返回值必须是一个打开的文件描述符。

# mode 参数有：
# 模式   描述
# t    文本模式 (默认)。
# x    写模式，新建一个文件，如果该文件已存在则会报错。
# b    二进制模式。
# +    打开一个文件进行更新(可读可写)。
# U    通用换行模式（Python 3 不支持）。
# r    以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。
# rb   以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。一般用于非文本文件如图片等。
# r+   打开一个文件用于读写。文件指针将会放在文件的开头。
# rb+  以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。一般用于非文本文件如图片等。
# w    打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。
# wb   以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等。
# w+   打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。
# wb+  以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。一般用于非文本文件如图片等。
# a    打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。
# ab   以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。
# a+   打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。
# ab+  以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。
file = open('filetest.txt', mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None)
#  file 对象常用的函数：
# file.close() 关闭文件。关闭后文件不能再进行读写操作。
# file.flush() 刷新文件内部缓冲，直接把内部缓冲区的数据立刻写入文件, 而不是被动的等待输出缓冲区写入。
# file.fileno() 返回一个整型的文件描述符(file descriptor FD 整型), 可以用在如os模块的read方法等一些底层操作上。
# file.isatty() 如果文件连接到一个终端设备返回 True，否则返回 False。
# file.next() Python 3 中的 File 对象不支持 next() 方法。 返回文件下一行。
# file.read([size]) 从文件读取指定的字节数，如果未给定或为负则读取所有。
# file.readline([size]) 读取整行，包括 "\n" 字符。
# file.readlines([sizeint]) 读取所有行并返回列表，若给定sizeint>0，返回总和大约为sizeint字节的行, 实际读取值可能比 sizeint 较大, 因为需要填充缓冲区。
# file.seek(offset[, whence]) 移动文件读取指针到指定位置
# file.tell() 返回文件当前位置。
# file.truncate([size]) 从文件的首行首字符开始截断，截断文件为 size 个字符，无 size 表示从当前位置截断；截断之后后面的所有字符被删除，其中 windows 系统下的换行代表2个字符大小。
# file.write(str) 将字符串写入文件，返回的是写入的字符长度。
# file.writelines(sequence) 向文件写入一个序列字符串列表，如果需要换行则要自己加入每行的换行符。

"""
文件和目录
"""
# os 模块提供了非常丰富的方法用来处理文件和目录。常用的方法如下表所示：
#
# 序号   方法及描述
# os.access(path, mode) 检验权限模式
# os.chdir(path) 改变当前工作目录
# os.chflags(path, flags) 设置路径的标记为数字标记。
# os.chmod(path, mode) 更改权限
# os.chown(path, uid, gid) 更改文件所有者
# os.chroot(path) 改变当前进程的根目录
# os.close(fd) 关闭文件描述符 fd
# os.closerange(fd_low, fd_high) 关闭所有文件描述符，从 fd_low (包含) 到 fd_high (不包含), 错误会忽略
# os.dup(fd) 复制文件描述符 fd
# os.dup2(fd, fd2) 将一个文件描述符 fd 复制到另一个 fd2
# os.fchdir(fd) 通过文件描述符改变当前工作目录
# os.fchmod(fd, mode) 改变一个文件的访问权限，该文件由参数fd指定，参数mode是Unix下的文件访问权限。
# os.fchown(fd, uid, gid) 修改一个文件的所有权，这个函数修改一个文件的用户ID和用户组ID，该文件由文件描述符fd指定。
# os.fdatasync(fd) 强制将文件写入磁盘，该文件由文件描述符fd指定，但是不强制更新文件的状态信息。
# os.fdopen(fd[, mode[, bufsize]]) 通过文件描述符 fd 创建一个文件对象，并返回这个文件对象
# os.fpathconf(fd, name) 返回一个打开的文件的系统配置信息。name为检索的系统配置的值，它也许是一个定义系统值的字符串，这些名字在很多标准中指定（POSIX.1, Unix 95, Unix 98, 和其它）。
# os.fstat(fd) 返回文件描述符fd的状态，像stat()。
# os.fstatvfs(fd) 返回包含文件描述符fd的文件的文件系统的信息，Python 3.3 相等于 statvfs()。
# os.fsync(fd)  强制将文件描述符为fd的文件写入硬盘。
# os.ftruncate(fd, length) 裁剪文件描述符fd对应的文件, 所以它最大不能超过文件大小。
# os.getcwd() 返回当前工作目录
# os.getcwdb() 返回一个当前工作目录的Unicode对象
# os.isatty(fd) 如果文件描述符fd是打开的，同时与tty(-like)设备相连，则返回true, 否则False。
# os.lchflags(path, flags) 设置路径的标记为数字标记，类似 chflags()，但是没有软链接
# os.lchmod(path, mode) 修改连接文件权限
# os.lchown(path, uid, gid) 更改文件所有者，类似 chown，但是不追踪链接。
# os.link(src, dst) 创建硬链接，名为参数 dst，指向参数 src
# os.listdir(path) 返回path指定的文件夹包含的文件或文件夹的名字的列表。
# os.lseek(fd, pos, how) 设置文件描述符 fd当前位置为pos, how方式修改: SEEK_SET 或者 0 设置从文件开始的计算的pos; SEEK_CUR或者 1 则从当前位置计算; os.SEEK_END或者2则从文件尾部开始. 在unix，Windows中有效
# os.lstat(path) 像stat(),但是没有软链接
# os.major(device) 从原始的设备号中提取设备major号码 (使用stat中的st_dev或者st_rdev field)。
# os.makedev(major, minor) 以major和minor设备号组成一个原始设备号
# os.makedirs(path[, mode]) 递归文件夹创建函数。像mkdir(), 但创建的所有intermediate-level文件夹需要包含子文件夹。
# os.minor(device) 从原始的设备号中提取设备minor号码 (使用stat中的st_dev或者st_rdev field )。
# os.mkdir(path[, mode]) 以数字mode的mode创建一个名为path的文件夹.默认的 mode 是 0777 (八进制)。
# os.mkfifo(path[, mode]) 创建命名管道，mode 为数字，默认为 0666 (八进制)
# os.mknod(filename[, mode=0600, device]) 创建一个名为filename文件系统节点（文件，设备特别文件或者命名pipe）。
# os.open(file, flags[, mode]) 打开一个文件，并且设置需要的打开选项，mode参数是可选的
# os.openpty() 打开一个新的伪终端对。返回 pty 和 tty的文件描述符。
# os.pathconf(path, name) 返回相关文件的系统配置信息。
# os.pipe() 创建一个管道. 返回一对文件描述符(r, w) 分别为读和写
# os.popen(command[, mode[, bufsize]]) 从一个 command 打开一个管道
# os.read(fd, n) 从文件描述符 fd 中读取最多 n 个字节，返回包含读取字节的字符串，文件描述符 fd对应文件已达到结尾, 返回一个空字符串。
# os.readlink(path) 返回软链接所指向的文件
# os.remove(path) 删除路径为path的文件。如果path 是一个文件夹，将抛出OSError; 查看下面的rmdir()删除一个 directory。
# os.removedirs(path) 递归删除目录。
# os.rename(src, dst) 重命名文件或目录，从 src 到 dst
# os.renames(old, new) 递归地对目录进行更名，也可以对文件进行更名。
# os.rmdir(path) 删除path指定的空目录，如果目录非空，则抛出一个OSError异常。
# os.stat(path) 获取path指定的路径的信息，功能等同于C API中的stat()系统调用。
# os.stat_float_times([newvalue]) 决定stat_result是否以float对象显示时间戳
# os.statvfs(path) 获取指定路径的文件系统统计信息
# os.symlink(src, dst) 创建一个软链接
# os.tcgetpgrp(fd) 返回与终端fd（一个由os.open()返回的打开的文件描述符）关联的进程组
# os.tcsetpgrp(fd, pg) 设置与终端fd（一个由os.open()返回的打开的文件描述符）关联的进程组为pg。
# os.tempnam([dir[, prefix]]) Python3 中已删除。返回唯一的路径名用于创建临时文件。
# os.tmpfile() Python3 中已删除。返回一个打开的模式为(w+b)的文件对象 .这文件对象没有文件夹入口，没有文件描述符，将会自动删除。
# os.tmpnam() Python3 中已删除。为创建一个临时文件返回一个唯一的路径
# os.ttyname(fd) 返回一个字符串，它表示与文件描述符fd 关联的终端设备。如果fd 没有与终端设备关联，则引发一个异常。
# os.unlink(path) 删除文件路径
# os.utime(path, times) 返回指定的path文件的访问和修改的时间。
# os.walk(top[, topdown=True[, onerror=None[, followlinks=False]]]) 输出在文件夹中的文件名通过在树中游走，向上或者向下。
# os.write(fd, str) 写入字符串到文件描述符 fd中. 返回实际写入的字符串长度
# os.path 模块 获取文件的属性信息。
# os.pardir() 获取当前目录的父目录，以字符串形式显示目录名。
```

# 语法错误和异常

```python
"""
语法错误和异常
"""
# 语法错误 SyntaxError
# 异常  ZeroDivisionError，NameError 和 TypeError
# 异常处理
# ---try/except---
# 一个except子句可以同时处理多个异常，这些异常将被放在一个括号里成为一个元组，例如:
# except (RuntimeError, TypeError, NameError):
while True:
    try:
        x = int(input("请输入一个数字: "))
        break
    except ValueError:
        print("您输入的不是数字，请再次尝试输入！")
# ----try/except...else---else 子句将在 try 子句没有发生任何异常的时候执行
# ---try-finally----
# 抛出异常 raise [Exception [, args [, traceback]]]
x = 10
if x > 5:
    raise Exception('x 不能大于 5。x 的值为: {}'.format(x))
# 用户自定义异常 通过创建一个新的异常类来拥有自己的异常。异常类继承自 Exception 类，可以直接继承，或者间接继承
# with 语句就可以保证诸如文件之类的对象在使用完之后一定会正确的执行他的清理方法
with open("myfile.txt") as f:
    for line in f:
        print(line, end="")
```

# Mysql

```python
import mysql.connector

# python -m pip install mysql-connector 安装连接驱动
# python -m pip install mysql-connector-python
# pip uninstall mysql-connector 卸载
mydb = mysql.connector.connect(
    host="localhost",  # 数据库主机地址
    user="root",  # 数据库用户名
    passwd="root"  # 数据库密码
    # auth_plugin='mysql_native_password'
    # database="runoob_db" #有则直接连接数据库
)

print(mydb)

# 创建数据库
mycursor = mydb.cursor()
mycursor.execute("CREATE DATABASE runoob_db")
# 输出所有数据库列表
mycursor.execute("SHOW DATABASES")
for x in mycursor:
    print(x)

# 创建表
mycursor.execute("CREATE TABLE sites (name VARCHAR(255), url VARCHAR(255))")
# mycursor.execute(sql语句)


# 增
sql = "INSERT INTO sites (name, url) VALUES (%s, %s)"
val = ("RUNOOB", "https://www.runoob.com")
mycursor.execute(sql, val)
mydb.commit()  # 数据表内容有更新，必须使用到该语句
print(mycursor.rowcount, "记录插入成功。")

# 批量增
sql = "INSERT INTO sites (name, url) VALUES (%s, %s)"
val = [
    ('Google', 'https://www.google.com'),
    ('Github', 'https://www.github.com'),
    ('Taobao', 'https://www.taobao.com'),
    ('stackoverflow', 'https://www.stackoverflow.com/')
]
mycursor.executemany(sql, val)
mydb.commit()  # 数据表内容有更新，必须使用到该语句
print(mycursor.rowcount, "记录插入成功, ID:", mycursor.lastrowid)

# 查
mycursor.execute("SELECT * FROM sites")
myresult = mycursor.fetchall()  # fetchall() 获取所有记录
myresult = mycursor.fetchone()  #获取一条
for x in myresult:
    print(x)

# 防sql注入
sql = "SELECT * FROM sites WHERE name = %s"
na = ("RUNOOB",)
mycursor.execute(sql, na)
myresult = mycursor.fetchall()
for x in myresult:
    print(x)

#删
sql = "DELETE FROM sites WHERE name = 'stackoverflow'"
mycursor.execute(sql)
mydb.commit()
print(mycursor.rowcount, " 条记录删除")

# 改
sql = "UPDATE sites SET name = 'ZH' WHERE name = 'Zhihu'"
mycursor.execute(sql)
mydb.commit()
print(mycursor.rowcount, " 条记录被修改")
```

# 网络编程

```python
"""
网络编程
"""

# 低级别的网络服务支持基本的 Socket，它提供了标准的 BSD Sockets API，可以访问底层操作系统 Socket 接口的全部方法。
# 高级别的网络服务模块 SocketServer， 它提供了服务器中心类，可以简化网络服务器的开发。

# socket()
# socket.socket([family[, type[, proto]]])
# family: 套接字家族可以使 AF_UNIX 或者 AF_INET。
# type:套接字类型可以根据是面向连接的还是非连接分为SOCK_STREAM或SOCK_DGRAM。
# protocol: 一般不填默认为 0。
# Socket 对象(内建)方法


# 函数                            描述
# 服务器端套接字-----------
# s.bind()     绑定地址（host,port）到套接字， 在 AF_INET下，以元组（host,port）的形式表示地址。
# s.listen()   开始 TCP 监听。backlog 指定在拒绝连接之前，操作系统可以挂起的最大连接数量。该值至少为 1，大部分应用程序设为 5 就可以了。
# s.accept()   被动接受TCP客户端连接,(阻塞式)等待连接的到来
# 客户端套接字-----------
# s.connect()      主动初始化TCP服务器连接，。一般address的格式为元组（hostname,port），如果连接出错，返回socket.error错误。
# s.connect_ex()   connect()函数的扩展版本,出错时返回出错码,而不是抛出异常
# 公共用途的套接字函数----------
# s.recv() 接收 TCP 数据，数据以字符串形式返回，bufsize 指定要接收的最大数据量。flag 提供有关消息的其他信息，通常可以忽略。
# s.send() 发送 TCP 数据，将 string 中的数据发送到连接的套接字。返回值是要发送的字节数量，该数量可能小于 string 的字节大小。
# s.sendall()  完整发送 TCP 数据。将 string 中的数据发送到连接的套接字，但在返回之前会尝试发送所有数据。成功返回 None，失败则抛出异常。
# s.recvfrom() 接收 UDP 数据，与 recv() 类似，但返回值是（data,address）。其中 data 是包含接收数据的字符串，address 是发送数据的套接字地址。
# s.sendto()   发送 UDP 数据，将数据发送到套接字，address 是形式为（ipaddr，port）的元组，指定远程地址。返回值是发送的字节数。
# s.close()    关闭套接字
# s.getpeername()  返回连接套接字的远程地址。返回值通常是元组（ipaddr,port）。
# s.getsockname()  返回套接字自己的地址。通常是一个元组(ipaddr,port)
# s.setsockopt(level,optname,value)    设置给定套接字选项的值。
# s.getsockopt(level,optname[.buflen]) 返回套接字选项的值。
# s.settimeout(timeout)    设置套接字操作的超时期，timeout是一个浮点数，单位是秒。值为None表示没有超时期。一般，超时期应该在刚创建套接字时设置，因为它们可能用于连接的操作（如connect()）
# s.gettimeout()   返回当前超时期的值，单位是秒，如果没有设置超时期，则返回None。
# s.fileno()   返回套接字的文件描述符。
# s.setblocking(flag)  如果flag为0，则将套接字设为非阻塞模式，否则将套接字设为阻塞模式（默认值）。非阻塞模式下，如果调用recv()没有发现任何数据，或send()调用无法立即发送数据，那么将引起socket.error异常。
# s.makefile() 创建一个与该套接字相关连的文件
```

```python
import socket
import sys

# 创建 socket 对象
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

# 获取本地主机名
host = socket.gethostname()

# 设置端口号
port = 9999

# 连接服务，指定主机和端口
s.connect((host, port))

# 接收小于 1024 字节的数据
msg = s.recv(1024)

s.close()

print (msg.decode('utf-8'))
```

```python
import socket
import sys

# 创建 socket 对象
serversocket = socket.socket(
    socket.AF_INET, socket.SOCK_STREAM)

# 获取本地主机名
host = socket.gethostname()

port = 9999

# 绑定端口号
serversocket.bind((host, port))

# 设置最大连接数，超过后排队
serversocket.listen(5)

while True:
    # 建立客户端连接
    clientsocket, addr = serversocket.accept()

    print("连接地址: %s" % str(addr))

    msg = '欢迎访问菜鸟教程！' + "\r\n"
    clientsocket.send(msg.encode('utf-8'))
    clientsocket.close()
```

# SMTP

```python
"""
SMTP
"""
# SMTP（Simple Mail Transfer Protocol）即简单邮件传输协议,它是一组用于由源地址到目的地址传送邮件的规则，由它来控制信件的中转方式。
# python的smtplib提供了一种很方便的途径发送电子邮件。它对smtp协议进行了简单的封装。
# Python创建 SMTP 对象语法如下：
# import smtplib
# smtpObj = smtplib.SMTP( [host [, port [, local_hostname]]] )
# 参数说明：
# host: SMTP 服务器主机。 你可以指定主机的ip地址或者域名如:runoob.com，这个是可选参数。
# port: 如果你提供了 host 参数, 你需要指定 SMTP 服务使用的端口号，一般情况下SMTP端口号为25。
# local_hostname: 如果SMTP在你的本机上，你只需要指定服务器地址为 localhost 即可。
# Python SMTP对象使用sendmail方法发送邮件，语法如下：
# SMTP.sendmail(from_addr, to_addrs, msg[, mail_options, rcpt_options]
# 参数说明：
# from_addr: 邮件发送者地址。
# to_addrs: 字符串列表，邮件发送地址。
# msg: 发送消息
# 这里要注意一下第三个参数，msg是字符串，表示邮件。我们知道邮件一般由标题，发信人，收件人，邮件内容，附件等构成，发送邮件的时候，要注意msg的格式。这个格式就是smtp协议中定义的格式。

import smtplib
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header

my_sender='714416426@qq.com'    # 发件人邮箱账号
my_pass = '11111111'              # 发件人邮箱密码
my_user='714416426@qq.com'      # 收件人邮箱账号，我这边发送给自己


sender = 'from@runoob.com'
receivers = ['714416426@qq.com']  # 接收邮件，可设置为你的QQ邮箱或者其他邮箱
msgRoot = MIMEMultipart('related')
msgRoot['From'] = Header("菜鸟教程", 'utf-8')
msgRoot['To'] =  Header("测试", 'utf-8')
subject = 'Python SMTP 邮件测试'
msgRoot['Subject'] = Header(subject, 'utf-8')




# 发送html内容
mail_msg = """
\<p>Python 邮件发送测试...\</p>
\<p>\<a href="http://www.runoob.com">这是一个链接\</a>\</p>
"""
message = MIMEText(mail_msg, 'html', 'utf-8')


# 三个参数：第一个为文本内容，第二个 plain 设置文本格式，第三个 utf-8 设置编码
message = MIMEText('Python 邮件发送测试...', 'plain', 'utf-8')
message['From'] = Header("菜鸟教程", 'utf-8')  # 发送者
message['To'] = Header("测试", 'utf-8')  # 接收者

subject = 'Python SMTP 邮件测试'
message['Subject'] = Header(subject, 'utf-8')


# 发送带附件内容
# # 构造附件1，传送当前目录下的 test.txt 文件
# att1 = MIMEText(open('test.txt', 'rb').read(), 'base64', 'utf-8')
# att1["Content-Type"] = 'application/octet-stream'
# # 这里的filename可以任意写，写什么名字，邮件中显示什么名字
# att1["Content-Disposition"] = 'attachment; filename="test.txt"'
# message.attach(att1)
#
# # 构造附件2，传送当前目录下的 runoob.txt 文件
# att2 = MIMEText(open('runoob.txt', 'rb').read(), 'base64', 'utf-8')
# att2["Content-Type"] = 'application/octet-stream'
# att2["Content-Disposition"] = 'attachment; filename="runoob.txt"'
# message.attach(att2)


# 文本中添加图片
# msgAlternative = MIMEMultipart('alternative')
# msgRoot.attach(msgAlternative)
# mail_msg = """
# \<p>Python 邮件发送测试...\</p>
# \<p>\<a href="http://www.runoob.com">菜鸟教程链接\</a>\</p>
# \<p>图片演示：\</p>
# \<p><img src="cid:image1">\</p>
# """
# msgAlternative.attach(MIMEText(mail_msg, 'html', 'utf-8'))
#
# # 指定图片为当前目录
# fp = open('test.png', 'rb')
# msgImage = MIMEImage(fp.read())
# fp.close()
#
# # 定义图片 ID，在 HTML 文本中引用
# msgImage.add_header('Content-ID', '\<image1>')
# msgRoot.attach(msgImage)


try:
    smtpObj = smtplib.SMTP('localhost')
    smtpObj.sendmail(my_sender, receivers, message.as_string())
    print("邮件发送成功")
except smtplib.SMTPException:
    print("Error: 无法发送邮件")
```

# 多线程

```python
"""
多线程：函数或者用类来包装线程对象
"""

# 函数式：调用thread模块中的start_new_thread()函数来产生新线程。语法如下:
# thread.start_new_thread ( function, args[, kwargs] )
# 参数说明:
# function - 线程函数。
# args - 传递给线程函数的参数,他必须是个tuple类型。
# kwargs - 可选参数。
# 两个模块
# _thread
# threading(推荐使用)
import _thread
import time

# 为线程定义一个函数
def print_time( threadName, delay):
   count = 0
   while count \< 5:
      time.sleep(delay)
      count += 1
      print ("%s: %s" % ( threadName, time.ctime(time.time()) ))

# 创建两个线程
try:
   _thread.start_new_thread( print_time, ("Thread-1", 2, ) )
   _thread.start_new_thread( print_time, ("Thread-2", 4, ) )
except:
   print ("Error: 无法启动线程")

while 1:
   pass


# _thread 提供了低级别的、原始的线程以及一个简单的锁，它相比于 threading 模块的功能还是比较有限的。
#
# threading 模块除了包含 _thread 模块中的所有方法外，还提供的其他方法：
#
# threading.currentThread(): 返回当前的线程变量。
# threading.enumerate(): 返回一个包含正在运行的线程的list。正在运行指线程启动后、结束前，不包括启动前和终止后的线程。
# threading.activeCount(): 返回正在运行的线程数量，与len(threading.enumerate())有相同的结果。
# 除了使用方法外，线程模块同样提供了Thread类来处理线程，Thread类提供了以下方法:
#
# run(): 用以表示线程活动的方法。
# start():启动线程活动。
# join([time]): 等待至线程中止。这阻塞调用线程直至线程的join() 方法被调用中止-正常退出或者抛出未处理的异常-或者是可选的超时发生。
# isAlive(): 返回线程是否活动的。
# getName(): 返回线程名。
# setName(): 设置线程名。

import threading

exitFlag = 0

class myThread (threading.Thread):
    def __init__(self, threadID, name, counter):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.counter = counter
    def run(self):
        print ("开始线程：" + self.name)
        print_time(self.name, self.counter, 5)
        print ("退出线程：" + self.name)

def print_time(threadName, delay, counter):
    while counter:
        if exitFlag:
            threadName.exit()
        time.sleep(delay)
        print ("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1

# 创建新线程
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 2)

# 开启新线程
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print ("退出主线程")

# 线程同步
# 使用 Thread 对象的 Lock 和 Rlock 可以实现简单的线程同步，这两个对象都有 acquire 方法和 release 方法，对于那些需要每次只允许一个线程操作的数据，可以将其操作放到 acquire 和 release 方法之间
# 线程优先级队列（ Queue）
# Python 的 Queue 模块中提供了同步的、线程安全的队列类，包括FIFO（先入先出)队列Queue，LIFO（后入先出）队列LifoQueue，和优先级队列 PriorityQueue。
# 这些队列都实现了锁原语，能够在多线程中直接使用，可以使用队列来实现线程间的同步。
# Queue 模块中的常用方法:
# Queue.qsize() 返回队列的大小
# Queue.empty() 如果队列为空，返回True,反之False
# Queue.full() 如果队列满了，返回True,反之False
# Queue.full 与 maxsize 大小对应
# Queue.get([block[, timeout]])获取队列，timeout等待时间
# Queue.get_nowait() 相当Queue.get(False)
# Queue.put(item) 写入队列，timeout等待时间
# Queue.put_nowait(item) 相当Queue.put(item, False)
# Queue.task_done() 在完成一项工作之后，Queue.task_done()函数向任务已经完成的队列发送一个信号
# Queue.join() 实际上意味着等到队列为空，再执行别的操作
```

# urllib

```python
"""
urllib 库用于操作网页 URL，并对网页的内容进行抓取处理。
"""
# urllib.request - 打开和读取 URL。
# urllib.error - 包含 urllib.request 抛出的异常。
# urllib.parse - 解析 URL。
# urllib.robotparser - 解析 robots.txt 文件

# urllib.request.urlopen(url, data=None, [timeout, ]*, cafile=None, capath=None, cadefault=False, context=None)
# url：url 地址。
# data：发送到服务器的其他数据对象，默认为 None。
# timeout：设置访问超时时间。
# cafile 和 capath：cafile 为 CA 证书， capath 为 CA 证书的路径，使用 HTTPS 需要用到。
# cadefault：已经被弃用。
# context：ssl.SSLContext类型，用来指定 SSL 设置。

from urllib.request import urlopen

myURL = urlopen("https://www.runoob.com/")
print(myURL.read())
print(myURL.read(600))
print(myURL.readline())
lines = myURL.readlines()
for line in lines:
    print(line)
print(myURL.getcode())

f = open("runoob_urllib_test.html", "wb")
content = myURL.read()  # 读取网页内容
f.write(content)
f.close()

import urllib.request

encode_url = urllib.request.quote("https://www.runoob.com/")  # 编码
print(encode_url)

unencode_url = urllib.request.unquote(encode_url)    # 解码
print(unencode_url)


# 模拟头部信息
# class urllib.request.Request(url, data=None, headers={}, origin_req_host=None, unverifiable=False, method=None)
# url：url 地址。
# data：发送到服务器的其他数据对象，默认为 None。
# headers：HTTP 请求的头部信息，字典格式。
# origin_req_host：请求的主机地址，IP 或域名。
# unverifiable：很少用整个参数，用于设置网页是否需要验证，默认是False。。
# method：请求方法， 如 GET、POST、DELETE、PUT等。
import urllib.parse

url = 'https://www.runoob.com/?s='  # 菜鸟教程搜索页面
keyword = 'Python 教程'
key_code = urllib.request.quote(keyword)  # 对请求进行编码
url_all = url+key_code
header = {
    'User-Agent':'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
}   #头部信息
request = urllib.request.Request(url_all,headers=header)
reponse = urllib.request.urlopen(request).read()

fh = open("./urllib_test_runoob_search.html","wb")    # 将文件写入到当前目录中
fh.write(reponse)
fh.close()
```

# XML解析

```python
"""
XML解析
"""
# SAX 是一种基于事件驱动的API。
# 利用 SAX 解析 XML 文档牵涉到两个部分: 解析器和事件处理器。
# 解析器负责读取 XML 文档，并向事件处理器发送事件，如元素开始跟元素结束事件。
# 而事件处理器则负责对事件作出响应，对传递的 XML 数据进行处理。
# 1、对大型文件进行处理；
# 2、只需要文件的部分内容，或者只需从文件中得到特定信息。
# 3、想建立自己的对象模型的时候。
# 在 Python 中使用 sax 方式处理 xml 要先引入 xml.sax 中的 parse 函数，还有 xml.sax.handler 中的 ContentHandler。
# ContentHandler 类方法介绍
# characters(content) 方法
# 调用时机：
# 从行开始，遇到标签之前，存在字符，content 的值为这些字符串。
# 从一个标签，遇到下一个标签之前， 存在字符，content 的值为这些字符串。
# 从一个标签，遇到行结束符之前，存在字符，content 的值为这些字符串。
# 标签可以是开始标签，也可以是结束标签。
# startDocument() 方法
# 文档启动的时候调用。
# endDocument() 方法
# 解析器到达文档结尾时调用。
# startElement(name, attrs) 方法
# 遇到XML开始标签时调用，name 是标签的名字，attrs 是标签的属性值字典。
# endElement(name) 方法
# 遇到XML结束标签时调用。
# make_parser 方法
# 以下方法创建一个新的解析器对象并返回。
# xml.sax.make_parser( [parser_list] )
# 参数说明:
# parser_list - 可选参数，解析器列表
# parser 方法
# 以下方法创建一个 SAX 解析器并解析xml文档：
# xml.sax.parse( xmlfile, contenthandler[, errorhandler])
# 参数说明:
# xmlfile - xml文件名
# contenthandler - 必须是一个 ContentHandler 的对象
# errorhandler - 如果指定该参数，errorhandler 必须是一个 SAX ErrorHandler 对象
# parseString 方法
# parseString 方法创建一个 XML 解析器并解析 xml 字符串：
# xml.sax.parseString(xmlstring, contenthandler[, errorhandler])
# 参数说明:
# xmlstring - xml字符串
# contenthandler - 必须是一个 ContentHandler 的对象
# errorhandler - 如果指定该参数，errorhandler 必须是一个 SAX ErrorHandler对象
import xml.sax


# from xml.dom.minidom import parse
# import xml.dom.minidom

# 使用xml.dom解析xml
# 文件对象模型（Document Object Model，简称DOM），是W3C组织推荐的处理可扩展置标语言的标准编程接口。
# 一个 DOM 的解析器在解析一个 XML 文档时，一次性读取整个文档，把文档中所有元素保存在内存中的一个树结构里，之后你可以利用DOM 提供的不同的函数来读取或修改文档的内容和结构，也可以把修改过的内容写入xml文件。
# python中用xml.dom.minidom来解析xml文件


# 使用minidom解析器打开 XML 文档
# DOMTree = xml.dom.minidom.parse("movies.xml")
# collection = DOMTree.documentElement
# if collection.hasAttribute("shelf"):
#    print ("Root element : %s" % collection.getAttribute("shelf"))
#
# # 在集合中获取所有电影
# movies = collection.getElementsByTagName("movie")
#
# # 打印每部电影的详细信息
# for movie in movies:
#    print ("*****Movie*****")
#    if movie.hasAttribute("title"):
#       print ("Title: %s" % movie.getAttribute("title"))
#
#    type = movie.getElementsByTagName('type')[0]
#    print ("Type: %s" % type.childNodes[0].data)
#    format = movie.getElementsByTagName('format')[0]
#    print ("Format: %s" % format.childNodes[0].data)
#    rating = movie.getElementsByTagName('rating')[0]
#    print ("Rating: %s" % rating.childNodes[0].data)
#    description = movie.getElementsByTagName('description')[0]
#    print ("Description: %s" % description.childNodes[0].data)


class MovieHandler(xml.sax.ContentHandler):
    def __init__(self):
        self.CurrentData = ""
        self.type = ""
        self.format = ""
        self.year = ""
        self.rating = ""
        self.stars = ""
        self.description = ""

    # 元素开始调用
    def startElement(self, tag, attributes):
        self.CurrentData = tag
        if tag == "movie":
            print("*****Movie*****")
            title = attributes["title"]
            print("Title:", title)

    # 元素结束调用
    def endElement(self, tag):
        if self.CurrentData == "type":
            print("Type:", self.type)
        elif self.CurrentData == "format":
            print("Format:", self.format)
        elif self.CurrentData == "year":
            print("Year:", self.year)
        elif self.CurrentData == "rating":
            print("Rating:", self.rating)
        elif self.CurrentData == "stars":
            print("Stars:", self.stars)
        elif self.CurrentData == "description":
            print("Description:", self.description)
        self.CurrentData = ""

    # 读取字符时调用
    def characters(self, content):
        if self.CurrentData == "type":
            self.type = content
        elif self.CurrentData == "format":
            self.format = content
        elif self.CurrentData == "year":
            self.year = content
        elif self.CurrentData == "rating":
            self.rating = content
        elif self.CurrentData == "stars":
            self.stars = content
        elif self.CurrentData == "description":
            self.description = content


if (__name__ == "__main__"):
    # 创建一个 XMLReader
    parser = xml.sax.make_parser()
    # 关闭命名空间
    parser.setFeature(xml.sax.handler.feature_namespaces, 0)

    # 重写 ContextHandler
    Handler = MovieHandler()
    parser.setContentHandler(Handler)

    parser.parse("movies.xml")
```

# 应用领域

- [Web and Internet Development](https://www.python.org/about/apps/#web-and-internet-development)
- [Database Access](https://www.python.org/about/apps/#database-access)
- [Desktop GUIs](https://www.python.org/about/apps/#desktop-guis)
- [Scientific & Numeric](https://www.python.org/about/apps/#scientific-and-numeric)
- [Education](https://www.python.org/about/apps/#education)
- [Network Programming](https://www.python.org/about/apps/#network-programming)
- [Software & Game Development](https://www.python.org/about/apps/#software-development)

## 爬虫

## WEB开发

## 图形处理

## 深度学习

## 数据分析

