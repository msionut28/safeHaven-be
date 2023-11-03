export async function addMarker (Marker, req, res) {
    try {
      const { position, text,} = req.body;
      const newMarker = new Marker({ 
        position,
        text,
      });
      await newMarker.save();
      res.status(201).json(newMarker);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  export async function deleteMarker(Marker, req, res) {
    try {
        const id  = req.params.id;
        const result = await Marker.findByIdAndRemove(id);
        if (result) {
            res.status(200).json({ message: 'Marker deleted successfully' });
        } else {
            res.status(404).json({ message: 'Marker not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
} 

 export async function getMarker (Marker, req, res){
  const markers = await Marker.find({})
  res.json(markers)
 }