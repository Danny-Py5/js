import random


class RockPaperScissors:

    def __init__(self):

        self.computer_choose = random.choice((1,2,3))
        self.result = ''

    def choose(self):
        ch = ''
        if self.computer_choose == 1:
            ch = 'rock'
        elif self.computer_choose == 2:
            ch = 'paper'
        else:
            ch = 'scissors'
        return ch
    
    def info(self, player, computer_ch, msg):
        return f'You choose {player}, computer choose {computer_ch} {msg}'
    
    def compere(self, val:str):
        computer = self.choose()
        if val == 'rock':
            if computer == 'rock':
                self.result = self.info(val, computer, 'Tie')
            elif computer == 'paper':
                self.result = self.info(val, computer, 'You lose')
            else:
                self.result = self.info(val, computer, 'You win.')
                
        elif val == 'paper':
            if computer == 'rock':
                self.result = self.info(val, computer, 'You win.')
            elif computer == 'paper':
                self.result = self.info(val, computer, 'Tie')
            else:
                self.result = self.info(val, computer, 'You lose')
        else:
            if computer == 'rock':
                self.result = self.info(val, computer, 'You lose')
            elif computer == 'paper':
                self.result = self.info(val, computer, 'You win')
            else:
                self.result = self.info(val, computer, 'Tie')

    def display(self, val:str):
        self.compere(val)
        return self.result

def main():
    while True:
        rps = RockPaperScissors()

        print('1. Rock\n2. Paper\n3. Scissors')
        player = input('Choose: ').lower()
        if player in ('1','2','3','rock','paper','scissors'):
            print(rps.display(player.replace('1','rock').replace('2','paper').replace('3','scissors')))
        else:
            print('invalid input try again!')
            continue
        
        if input('Play again y/n: ') != 'y':
            break

a = True if 55 > 5 else False


if __name__ == '__main__':
    # main()
    pass


new  = [4, 5, 6]


new.pop(1)

print(new)


for val in range(10):
    if val == 5:
        continue
    print(val)


ls = range(-7, 10, 2)

print(list(filter(lambda x: x > 0, ls)))

print(list(map(lambda x: x + 1, ls)))

print(list((x + 1 for x in ls)))





