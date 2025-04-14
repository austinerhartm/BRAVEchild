import 'dotenv/config';
import db from '../config/db.js';
import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middleware/token_auth.js';
import { require_role } from '../middleware/require_role.js';

// Get all parents
router.get('/', authenticateToken, require_role('super_admin'), async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT p.*, d.child_name 
            FROM parents p
            LEFT JOIN donation_receivers d ON p.child_id = d.child_id
            ORDER BY p.lastName, p.firstName
        `);
        
        res.json({
            success: true,
            data: {
                parents: rows
            }
        });
    } catch (error) {
        console.error('Error fetching parents:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch parents',
            error: error.message
        });
    }
});

// Add a new parent
router.post('/', authenticateToken, require_role('super_admin'), async (req, res) => {
    try {
        const { firstName, lastName, email, childId, notes } = req.body;
        
        if (!firstName || !lastName || !email || !childId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        // Check if email already exists
        const [existingParents] = await db.query(
            'SELECT * FROM parents WHERE email = ?',
            [email]
        );
        
        if (existingParents.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'A parent with this email already exists'
            });
        }
        
        // Insert new parent
        const [result] = await db.query(
            `INSERT INTO parents (firstName, lastName, email, child_id, notes) 
             VALUES (?, ?, ?, ?, ?)`,
            [firstName, lastName, email, childId, notes || '']
        );
        
        res.status(201).json({
            success: true,
            message: 'Parent added successfully',
            data: {
                id: result.insertId,
                firstName,
                lastName,
                email,
                childId,
                notes
            }
        });
    } catch (error) {
        console.error('Error adding parent:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add parent',
            error: error.message
        });
    }
});

// Update a parent
router.put('/:id', authenticateToken, require_role('super_admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, childId, notes } = req.body;
        
        if (!firstName || !lastName || !email || !childId) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }
        
        // Check if email already exists for a different parent
        const [existingParents] = await db.query(
            'SELECT * FROM parents WHERE email = ? AND id != ?',
            [email, id]
        );
        
        if (existingParents.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'A different parent with this email already exists'
            });
        }
        
        // Update parent
        await db.query(
            `UPDATE parents 
             SET firstName = ?, lastName = ?, email = ?, child_id = ?, notes = ?
             WHERE id = ?`,
            [firstName, lastName, email, childId, notes || '', id]
        );
        
        res.json({
            success: true,
            message: 'Parent updated successfully',
            data: {
                id,
                firstName,
                lastName,
                email,
                childId,
                notes
            }
        });
    } catch (error) {
        console.error('Error updating parent:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update parent',
            error: error.message
        });
    }
});

// Delete a parent
router.delete('/:id', authenticateToken, require_role('super_admin'), async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete parent
        await db.query('DELETE FROM parents WHERE id = ?', [id]);
        
        res.json({
            success: true,
            message: 'Parent deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting parent:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete parent',
            error: error.message
        });
    }
});

export default router;