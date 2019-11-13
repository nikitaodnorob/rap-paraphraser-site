#!D:\Windows\Programs\Python 3.7.2\python.exe
# -*- coding: utf-8 -*-
import warnings
warnings.filterwarnings("ignore")

import io, cgi, cgitb, sys, re, gensim
import pymorphy2 as pm
import os

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

directory = os.path.dirname(__file__)
model = gensim.models.KeyedVectors.load_word2vec_format(datapath(directory + "/model.bin"), binary=True)

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

def new_tag_list(a):
      arr = []
      arr2 = []
      tup = tuple()
      if a.endswith('NOUN'):
        b = a.split('_')
        arr.append(m.parse(b[0])[0].tag.case)
        arr.append(m.parse(b[0])[0].tag.number)
        arr2.append(m.parse(b[0])[0].tag.gender)
        tup = (arr,arr2)
        return tup
      if a.endswith('VERB'):
        b = a.split('_')
        arr.append(m.parse(b[0])[0].tag.mood)
        arr.append(m.parse(b[0])[0].tag.number)
        arr.append(m.parse(b[0])[0].tag.tense)
        arr.append(m.parse(b[0])[0].tag.person)
        arr.append(m.parse(b[0])[0].tag.gender)
        arr2.append(m.parse(b[0])[0].tag.transitivity)
        tup = (arr,arr2)
        return tup
      if a.endswith('ADJ'):
        b = a.split('_')
        arr.append(m.parse(b[0])[0].tag.number)
        arr.append(m.parse(b[0])[0].tag.gender)
        arr.append(m.parse(b[0])[0].tag.case)
        tup = (arr,arr2)
        return tup
      else:
        return None

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

def get_associat(word): 
    #word - слово
    lemma = my_tag_normal(word)
    features = new_tag_list(word+'_'+lemma.split('_')[1])
    if features is None:
        return word
    old_tl = features[0]
    nec = features[1]
    try:
        a = model.most_similar(positive=lemma)
        # print(a)
    except(Exception):
        return word
    for x in a:
        w_arr = x[0].split('_')
        if w_arr[1] == lemma.split('_')[1] and float(x[1]) >= 0.5: #часть речи и косинусная близость
            if w_arr[1] == 'NOUN':
                if old_tl[0] is None:
                    old_tl[0] = 'nomn'
                if old_tl[1] is None:
                    old_tl[1] = 'sing'
                if (nec[0] is None or m.parse(w_arr[0])[0].tag.gender == nec[0]):
                    result = m.parse(w_arr[0])[0].inflect(set(old_tl))
                    if result is None:
                        continue
                    return m.parse(w_arr[0])[0].inflect(set(old_tl))[0]
                
            if w_arr[1] == 'VERB':
                if (old_tl[0] is None) or (old_tl[0] != 'impr'):
                    fl = True
                    for el in old_tl:
                        try:
                            if not(el is None):
                                fl = False
                        except:
                            pass
                    if fl:
                        return w_arr[0]
                    
                    if old_tl[0] is None:
                        old_tl[0] = 'indc'
                    if old_tl[1] is None:
                        old_tl[1] = 'sing'
                    if old_tl[2] is None:
                        old_tl[2] = 'pres'
                    if old_tl[3] is None:
                        old_tl[3] = '1per'
                    try:
                        if old_tl[4] is None:
                            old_tl = old_tl[:4]
                    except:
                        pass
                else:
                    old_tl = old_tl[:2]
                if (nec[0] is None or m.parse(w_arr[0])[0].tag.transitivity == nec[0]):
                    result = m.parse(w_arr[0])[0].inflect(set(old_tl))
                    if result is None:
                        continue
                    return m.parse(w_arr[0])[0].inflect(set(old_tl))[0]
                
            if w_arr[1] == 'ADJ':
                if old_tl[0] is None:
                    old_tl[0] = 'sing'
                if old_tl[1] is None:
                    old_tl[1] = 'masc'
                if old_tl[2] is None:
                    old_tl[2] = 'gent' 
                result = m.parse(w_arr[0])[0].inflect(set(old_tl))
                if result is None:
                    
                    continue
                return m.parse(w_arr[0])[0].inflect(set(old_tl))[0]
    return word

#Анализ текста и вывод результата
def text_analys(text):
    res = {'second': '', 'last': ''}
    if text != "":
        cur_i = 0
        for w in re.split('[ ?!\\.\\,:;\\(\\)\\n"]', text):
            if res['last'] != "":
                res['second'] += res['last']
                res['last'] = ''
             
            len_w = len(w)
            #сохраняем фрагмент текста, в котором возможно будет замена
            if cur_i+len_w+1 > len(text):
                res['last'] = text[cur_i:cur_i+len_w]
            else:
                res['last'] = text[cur_i:cur_i+len_w+1] 
            cur_i += len_w + 1

            if w == "":
                continue 

            #убираем тире в начале слова
            if w[0] == '-':
                word = str(w[1:])
            else:
                word = w
            #уберем пробельные символы
            word = word.strip()
            if word == "" or word == "-":
                continue

            try:
                word2 = get_associat(word) #слово, замененное сетью на реп-эквивалент
            except:
                word2 = word
            if word == word2:
                res['second'] += res['last']
            else:
                #res['second'] += res['last'].replace(word, "<b>"+word2+"</b>",1)
                res['second'] += res['last'].replace(word, word2, 1)
            res['last'] = ''
            
        if res['last'] != "":
            res['second'] += res['last']
            res['last'] = ''
    return res['second']

form = cgi.FieldStorage()
text = form.getfirst("text", "")

write("Content-type: text/html; charset=utf-8\n\n")
bwrite(text_analys(text).encode())