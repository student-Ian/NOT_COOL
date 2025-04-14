from pulp import *

def scheduling(P,D,C,C2,TH):
    '''
    P 是完成各個作業預計花費的時間且長度為N的陣列
    D 是各個作業的截止時間且長度為N的陣列
    C 是各個作業未及時完成(接受遲交的時間內)處罰的參數且長度為N的陣列
    C2 是各個作業未及時完成(接受遲交的時間後)處罰的參數且長度為N的陣列
    TH 是各個作業接受遲交的時間且長度為N的陣列
    
    此函示會回傳各個作業的完成時間
    目前的演算法只適用於作業較少的狀況
    '''

    if not (len(P) == len(D) == len(C) == len(C2) == len(TH)):
        raise ValueError("參數 P, D, C, C2, TH 的長度必須相同")
    elif len(P) == 0:
        raise ValueError("參數 P, D, C, C2, TH 的長度必須大於零")
    
    n = len(P)
    m = LpProblem("task_scheduling", LpMinimize)

    z = []
    for i in range(n):
        z.append([])
        for j in range(i+1,n):
            z[i].append(LpVariable(f"seq_{i+1}_{j+1}", 0, 1, LpInteger))
    x = []
    for i in range(n):
         x.append(LpVariable(f"time_{i+1}", P[i], None, LpContinuous))

    t = []
    t2 = []
    for i in range(n):
        t.append(LpVariable(f"tar_{i+1}", 0, None, LpContinuous))
        t2.append(LpVariable(f"tar2_{i+1}", TH[i], None, LpContinuous))

    m += lpSum(C[i]*t[i]+C2[i]*(t2[i]-TH[i]) for i in range(n)), "Total_Cost_of_Lateness" 
    
    for i in range(n):
        m += t[i] >= x[i]-D[i], f"tar_constrain_{i+1}"
        m += t2[i] >= x[i]-D[i], f"tar2_constrain_{i+1}"

        

    M = sum(P) + max(P)
    for i in range(n):
        for j in range(i+1,n):
            m += x[i] + P[j] - x[j] <= M*z[i][j-(i+1)], f"seq_constrain_{i+1}_{j+1}"
            m += x[j] + P[i] - x[i] <= M*(1-z[i][j-(i+1)]), f"seq2_constrain_{i+1}_{j+1}"
    
    m.solve()
    l = [x[i].varValue for i in range(n)]
    return l
