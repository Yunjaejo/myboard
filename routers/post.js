const express = require("express");
const Goods = require("../schemas/Goods"); // Goods라는 스키마 참조
const Cart = require("../schemas/cart"); // Carts스키마 참조

const router = express.Router(); // 익스프레스 라우터를 router로 쓰겠다 