const { Router } = require('express')
const bli = require('../../models/BucketListItem')
const router = Router()

router.get('/:id', async (req, res) => {
    try {
        const items = await bli.findById(req.params.id)
        if (!items) return res.status(404).send({ error: 'No items found!' })
        else res.send(items)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.get('/', async (req, res) => {
    try {
        const items = await bli.find().sort('date')
        if (!items) return res.status(404).send({ error: 'No items found!' })
        else res.send(items)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.post('/', async (req, res) => {
    try {
        const bli_new = new bli(req.body)
        await bli_new.save()
        res.send(bli_new)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const item = await bli.findByIdAndUpdate(_id, req.body, { new: true })
        if (!item) return res.status(500).send(item)
        return res.send(item)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.delete('/all', async (req, res) => {
    try {
        const removed = await bli.deleteMany()
        if (!removed) return res.status(404).send()
        return res.send(removed)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const removed = await bli.findByIdAndDelete(req.params.id)
        if (!removed) return res.status(404).send()
        return res.send(removed)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

module.exports = router
