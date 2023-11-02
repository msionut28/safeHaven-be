export async function addReview(req, res, Reviews) {
  try {
    const data = req.body;
    const review = new Reviews({
      venue: data.venue,
      review: data.review,
      inclusivity: data.inclusivity,
      safety: data.safety,
      date: data.date,
      isUniversity: data.isUniversity,
      support: data.support,
      community: data.community
    });
    await review.save()
    res.status(200).json(review);
  } catch (err) {
    console.log("ERROR MESSAGE HERE ->", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getReview(req, res, Reviews) {
  const { venue } = req.query;
  try {
    const reviews = await Reviews.find({ venue });
    let inclusivityTotal = 0;
    let safetyTotal = 0;
    let supportTotal = 0;
    let communityTotal = 0;
    let universityCount = 0;

    reviews.forEach(review => {
      inclusivityTotal += review.inclusivity;
      safetyTotal += review.safety;
      if (review.isUniversity) {
        supportTotal += review.support;
        communityTotal += review.community;
        universityCount++;
      }
    });

    const averages = {
      inclusivity: inclusivityTotal / reviews.length,
      safety: safetyTotal / reviews.length,
      support: universityCount > 0 ? supportTotal / universityCount : null,
      community: universityCount > 0 ? communityTotal / universityCount : null,
    };

    const isUniversity = universityCount > 0;

    // Send back reviews, averages, and isUniversity
    res.status(200).json({ reviews, averages, isUniversity });
  } catch (err) {
    console.log("error", err.message);
    res.status(500).json({ error: "Internal error" });
  }
}

