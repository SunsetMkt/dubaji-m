import ctypes
import os

ampunpacker_path = os.path.join(os.path.dirname(__file__), "libampunpacker.so")
ampunpacker = ctypes.cdll.LoadLibrary(ampunpacker_path)
