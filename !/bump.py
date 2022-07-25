import sys
import os.path

def input_(*f, t=0):
  '''
  t=0: 1
  t=1: [1, 2, 3]
  '''
  if t == 0:
    return f[0](sys.stdin.readline().rstrip())
  else: # t == 1
    x = sys.stdin.readline().rstrip().split()
    if len(f) == 1:
      return list(map(f[0], x))
    else:
      assert(len(f)==len(x))
      for i in range(len(f)):
        x[i] = f[i](x[i])
      return x

islocal = os.path.isfile('local')

if islocal:
  def print_(*a, sep=' ', end='\n'):
    print('\033[92m', end='')
    print(*a, sep=sep, end='')
    print('\033[0m', end=end)
else:
  print_ = print

debug = (lambda *a: print('\033[2m[DEBUG]', *a, '[/DEBUG]\033[0m', sep='\n')) if islocal else lambda *a: 0
debug2dlist = (lambda a: debug('\n'.join(map(lambda x: ' '.join(map(str, x)), a)))) if islocal else lambda a: 0

if islocal: print_('[Running in Local]')

# sys.setrecursionlimit(10**6)
# from collections import deque
# from decimal import Decimal
# from fractions import Fraction

# Code
