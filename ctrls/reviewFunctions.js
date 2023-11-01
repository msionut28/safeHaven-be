export async function addReview (req, res, Reviews) {
    try {
        const data = req.body;
        const review = new Reviews({
        venue: data.venue,
        review: data.review,
        inclusivity: data.inclusivity,
        safety: data.safety,
        date: data.date,
        email: data.email
      });
    } catch (err) {
        console.log("ERROR MESSAGE HERE ->", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
}

export async function getReview (req, res, Reviews) {
    const { venue } = req.query;
    try {
      const reviews = await Reviews.find({ venue });
      res.status(200).json(reviews);
    } catch (err) {
      console.log("error", err.message);
      res.status(500).json({ error: "Internal error" });
    }
}