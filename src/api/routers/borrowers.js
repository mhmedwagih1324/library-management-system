import { Router } from "express";

const router = new Router();

router.get("/", () => {
  console.log("borrowers here");
});

export default router;
