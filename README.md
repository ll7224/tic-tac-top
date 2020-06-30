 # Tic-Tac-Toe

## 概念

* 棋子
  * PIECE_O
  * PIECE_X
* 棋格
  * PIECE_O
  * PIECE_X
  * EMPTY


## 定义

### 棋盘（Board)
* 属性
  * dimension: 尺寸，尺寸为3
  * cells: 棋盘数据，一位数组存储
* 方法
  * constructor(dimension = 3, cells = null): 棋盘初始化

### 游戏 (Game)
* 属性
  * board: 棋盘
  * containerEl: 容器元素
  * currentPiece: 当前落子的棋子
  * isRunning: 游戏是否运行中

* 方法
   * constructor(board,containerSelector = '.container'): 游戏初始化
   * _initDom (): 初始化DOM
   * _draw(): 绘制棋盘
   * move(position): 落子，棋子自动判定
   * moveByStratepy(strategy): 根据某个策略模型落子
   * start(): 开始游戏
   * restart(): 重置游戏

## 落子策略
   * Random
   * Minimax
