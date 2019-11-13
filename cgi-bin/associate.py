#!D:\Windows\Programs\Python 3.7.2\python.exe
# -*- coding: utf-8 -*-
import warnings
warnings.filterwarnings("ignore")

import io, cgi, cgitb, sys, re, gensim
import pymorphy2 as pm 

cgitb.enable()

if hasattr(sys.stdout, "buffer"):
  def bwrite(s):
    sys.stdout.flush()
    sys.stdout.buffer.write(s)
  write = sys.stdout.write
else:
  wrapper = io.TextIOWrapper(sys.stdout)
  def bwrite(s):
    wrapper.flush()
    sys.stdout.write(s)
  write = wrapper.write

import gensim
from gensim.test.utils import datapath

model = gensim.models.KeyedVectors.load_word2vec_format(datapath("D:\\Windows\\Programs\\OpenServer\\OSPanel\\domains\\rap\\cgi-bin\\model.bin"), binary=True)

m = pm.MorphAnalyzer() 

def replace(x):
    return {
        'A':  'ADJ',
        'ANUM' : 'ADJ',
        'ADJF' : 'ADJ',
        'ADV' : 'ADV',
        'ADVB' : 'ADV',
        'COMP' : 'ADV',
        'GRND' : 'VERB',
        'INFN' : 'VERB',
        'NOUN' : 'NOUN',
        'PRED' : 'ADV',
        'PRTF' : 'ADJ',
        'PRTS' : 'VERB',
        'VERB' : 'VERB',
        'PREP' : 'PREP',
        'CONJ' : 'CONJ',
        'PRCL' : 'PRCL',
        'INTJ' : 'INTJ',
        'NUMR' : 'NUM',
        'NPRO' : 'PRON'
    }[x] 

def my_tag_normal(str): 
    bb0 = m.parse(str)[0].normal_form 
    bb = m.parse(bb0)[0].tag.POS 
    if(bb is None): 
        bb1 = 'X' 
    else:
        try:
            bb1 = replace(bb)  
        except(Exception):
            bb1 = 'X'
    a1 = bb0 + '_' + bb1 
    return a1

#возвращает список пар <слово_тег, косинусная близость>
#Далее при проходе по списку и выводу резульата теги стоит убрать
def get_associat(word):
    res = ""
    if word == "":
        return res
    lemma = my_tag_normal(word.lower())
    try:
        res = "["
        for x in model.most_similar(positive=lemma):
            res += "{\"word\": \"" + x[0].split('_')[0] + "\", \"cos\":" + str(x[1]) + "},\n"
        res = res[0: len(res) - 2] + "]"
    except(Exception):
        res = "{error: \"notFound\"}"
    return res

write("Content-type: text/html; charset=utf-8\n\n")

form = cgi.FieldStorage()
word = form.getfirst("word", "")

bwrite(get_associat(word).encode())