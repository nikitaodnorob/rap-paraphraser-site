def convertTags(x): #конвертировать стандарт частеричных тегов для word2vec
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

def getWordWithTag(str, m): #проставить слову частеречный тег
    bb0 = m.parse(str)[0].normal_form 
    bb = m.parse(bb0)[0].tag.POS 
    if(bb is None): 
        bb1 = 'X' 
    else:
        try:
            bb1 = convertTags(bb)  
        except(Exception):
            bb1 = 'X'
    a1 = bb0 + '_' + bb1 
    return a1
