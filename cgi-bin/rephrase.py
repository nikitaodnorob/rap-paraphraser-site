#!D:\Windows\Programs\Python 3.7.2\python.exe
# -*- coding: utf-8 -*-
import warnings
warnings.filterwarnings("ignore")

import cgi, re, gensim, pymorphy2 as pm, os
import gensim
from gensim.test.utils import datapath
from writter import bwrite
from semantic import convertTags, getWordWithTag

directory = os.path.dirname(__file__)
model = gensim.models.KeyedVectors.load_word2vec_format(datapath(directory + "/model.bin"), binary=True)

m = pm.MorphAnalyzer()

def getWordProperties(a):
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

def getAssociat(word): #word - слово
    lemma = getWordWithTag(word, m)
    features = getWordProperties(word+'_'+lemma.split('_')[1])
    if features is None:
        return word
    old_tl = features[0]
    nec = features[1]
    try:
        a = model.most_similar(positive=lemma)
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

def rephraseText(text):
	cur_i = 0
	res = "["
	if text != "":
		for w in re.split('[ ?!\\.\\,:;\\(\\)\\n"]', text):
			if w == "":
				continue

			if w[0] == '-': #убираем тире в начале слова
				word = str(w[1:])
			else:
				word = w
            
			word = word.strip() #уберем пробельные символы
			if word == "" or word == "-":
				continue

			cur_i = text.find(word, cur_i)

			try:
				word2 = getAssociat(word) #слово, замененное сетью на реп-эквивалент
			except:
				word2 = word
			if word != word2:
				res += "{\"position\": " + str(cur_i) + ", \"oldWord\": \"" + word + "\", \"newWord\": \"" + word2 + "\"},\n"
		if res != "[" :
			res = res[0: len(res) - 2]
	return res + "]"

text = cgi.FieldStorage().getfirst("text", "")

print("Content-type: text/html; charset=utf-8\n")
bwrite(rephraseText(text).encode())
