import Tkinter

def draw_grid(canvas, level):
    canvas.draw()

def show_canvas():
    top = Tkinter.Tk()
    canvas = Canvas(top, width=800, height=600, bg = '#000000')
    return canvas