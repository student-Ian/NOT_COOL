from functools import partial
import random

def total_weighted_tardiness(seq,P,D,C,C2,TH):
    t, total = 0, 0
    for j in seq:
        t += P[j]
        total += C[j]*max(0, t-D[j])
        total += C2[j]*max(0, t-TH[j]-D[j])
    return total

def crossover(p1, p2):
    N = len(p1)
    a,b = sorted(random.sample(range(N),2))
    child = [-1]*N
    child[a:b] = p1[a:b]
    pos = b
    for g in p2[b:]+p2[:b]:
        if g not in child:
            child[pos%N] = g
            pos+=1
    return child

def mutate(seq, rate):
    N = len(seq)
    if random.random()<rate:
        i,j = sorted(random.sample(range(N),2))
        seq[i],seq[j] = seq[j],seq[i]


def GA(P,D,C,C2,TH,pop_size=50, generations=500, cxr=0.8, mutr=0.2):
    '''
    P 是完成各個作業預計花費的時間且長度為N的陣列  
    D 是各個作業的截止時間且長度為N的陣列  
    C 是各個作業未及時完成(接受遲交的時間內)處罰的參數且長度為N的陣列  
    C2 是各個作業未及時完成(接受遲交的時間後)處罰的參數且長度為N的陣列  
    TH 是各個作業接受遲交的時間且長度為N的陣列  
    pop_size 為生成陣列的長度  
    generations 為運算次數  
    cxr 為交叉機率  
    mutr 為變異機率  

    此函式會回傳作業完成的順序  
    '''
    if not (len(P) == len(D) == len(C) == len(C2) == len(TH)):
        raise ValueError("參數 P, D, C, C2, TH 的長度必須相同")
    elif len(P) == 0:
        raise ValueError("參數 P, D, C, C2, TH 的長度必須大於零")
    
    N = len(P)
    pop = [random.sample(range(N), N) for _ in range(pop_size)]
    for gen in range(generations):
        pop = sorted(pop, key=partial(total_weighted_tardiness,P=P,D=D,C=C,C2=C2,TH=TH))
        newpop = pop[:int(0.1*pop_size)] 
        while len(newpop)<pop_size:
            if random.random()<cxr:
                p1,p2 = random.sample(pop[:20],2)
                c = crossover(p1,p2)
            else:
                c = random.choice(pop)
            mutate(c, mutr)
            newpop.append(c)
        pop = newpop
    best = min(pop, key=partial(total_weighted_tardiness,P=P,D=D,C=C,C2=C2,TH=TH))
    return best

def GA_2(P,D,C,C2,TH,pop_size=50, generations=100, cxr=0.8, mutr=0.2):
    '''
    P 是完成各個作業預計花費的時間且長度為N的陣列  
    D 是各個作業的截止時間且長度為N的陣列  
    C 是各個作業未及時完成(接受遲交的時間內)處罰的參數且長度為N的陣列  
    C2 是各個作業未及時完成(接受遲交的時間後)處罰的參數且長度為N的陣列  
    TH 是各個作業接受遲交的時間且長度為N的陣列  
    pop_size 為生成陣列的長度  
    generations 為運算終止的條件  
    cxr 為交叉機率  
    mutr 為變異機率   

    此函式會回傳作業完成的順序  
    排程效果比GA好但較慢
    '''
    if not (len(P) == len(D) == len(C) == len(C2) == len(TH)):
        raise ValueError("參數 P, D, C, C2, TH 的長度必須相同")
    elif len(P) == 0:
        raise ValueError("參數 P, D, C, C2, TH 的長度必須大於零")
    
    N = len(P)
    pop = [random.sample(range(N), N) for _ in range(pop_size)]
    count = 0
    best = []
    best_val = -1
    while(count < generations):
        pop = sorted(pop, key=partial(total_weighted_tardiness,P=P,D=D,C=C,C2=C2,TH=TH))
        newpop = pop[:int(0.1*pop_size)] 
        while len(newpop)<pop_size:
            if random.random()<cxr:
                p1,p2 = random.sample(pop[:20],2)
                c = crossover(p1,p2)
            else:
                c = random.choice(pop)
            mutate(c, mutr)
            newpop.append(c)
        pop = newpop

        best_cand = min(pop, key=partial(total_weighted_tardiness,P=P,D=D,C=C,C2=C2,TH=TH))
        best_val_cand = total_weighted_tardiness(best_cand,P,D,C,C2,TH)
        if(best_val_cand < best_val or best_val < 0):
            best = best_cand
            best_val = best_val_cand
            count = 0
        elif(best_val_cand == 0):
            best = best_cand
            best_val = best_val_cand
            break
        else:
            count += 1
    return best
