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

#возвращает список пар <слово_тег, косинусная близость>
def getAssociat(word):
    res = ""
    if word == "":
        return res
    lemma = getWordWithTag(word.lower(), m)
    try:
        res = "["
        for x in model.most_similar(positive=lemma):
            res += "{\"word\": \"" + x[0].split('_')[0] + "\", \"cos\":" + str(x[1]) + "},\n"
        res = res[0: len(res) - 2] + "]"
    except(Exception):
        res = "{error: \"notFound\"}"
    return res

print("Content-type: text/html; charset=utf-8\n")

word = cgi.FieldStorage().getfirst("word", "")

bwrite(getAssociat(word).encode())
