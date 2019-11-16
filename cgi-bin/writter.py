import io, sys

# функция для вывода русского текста в закодированном виде
if hasattr(sys.stdout, "buffer"):
  def bwrite(s):
    sys.stdout.flush()
    sys.stdout.buffer.write(s)
else:
  wrapper = io.TextIOWrapper(sys.stdout)
  def bwrite(s):
    wrapper.flush()
    sys.stdout.write(s)
