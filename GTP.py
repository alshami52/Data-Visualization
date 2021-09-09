#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jun 28 11:33:23 2021

@author: alshami
"""


import numpy as np
import pandas as pd
import cv2
import argparse
import imutils

from PIL import Image, ImageDraw
from Models.tracknet import trackNet
from Players_detection.players_detector import *

"""
# Add Parse Parameters
1.Video input.
2.Video output.

"""
argparse. ArgumentParser().add_argument("--path_of_video_input",  type=str)
argparse. ArgumentParser().add_argument("--path_of_video_output", type=str, default='')

path_of_video_input  =  argparse. ArgumentParser().parse_args().path_of_video_input
path_of_video_output =  argparse. ArgumentParser().parse_args().path_of_video_output
Yolo_classes         =  "Yolov3/yolov3.cfg"
Yolo_weights         =  "Yolov3/yolov3.weights"
Yolo_config          =  "Yolov3/yolov3.cfg"
n_classes            =  256
