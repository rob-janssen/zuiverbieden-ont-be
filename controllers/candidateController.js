import Candidate from "../models/CandidateModel.js";
import ItemCandidate from "../models/ItemCandidatesModel.js";
import Item from "../models/ItemModel.js";

// Get all candidates
export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    res.status(200).json(candidates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one candidate
export const getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (candidate == null) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(candidate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create an candidate
export const createCandidate = async (req, res) => {
  const newCandidate = new Candidate({
    name: req.body.name,
    email: req.body.email,
    disableOnDate: req.body.disableOnDate,
  });

  try {
    const savedItem = await newCandidate.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an candidate
export const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (candidate == null) {
      return res.status(404).json({ message: "candidate not found" });
    }

    if (req.body.name != null) {
      candidate.name = req.body.name;
    }
    if (req.body.description != null) {
      candidate.description = req.body.description;
    }

    const updatedCandidate = await candidate.save();
    res.status(200).json(updatedCandidate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an candidate
export const deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Item not found" });
    }

    await candidate.remove();
    res.status(200).json({ message: "Candidate deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Attach canditate to item
export const attachCandidateToItem = async (req, res) => {
  try {
    const attach = await ItemCandidate.create({
      candidate_id: req.params.candidateId,
      item_id: req.body.itemId,
      role: req.body.role,
    });
    res.status(201).json({ message: `Candidate attached to item` });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
