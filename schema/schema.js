const graphql = require('graphql')
const { GraphQLSchema, GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull } = graphql
const Song = require('../models/song')
const Artist = require('../models/artist')

// BOOK
const SongType = new GraphQLObjectType({
   name: 'Song',
   fields: () => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      album: { type: GraphQLString },
      artist: { 
         type: ArtistType,
         resolve(parent, args) {
            return Artist.findById(parent.artistId)
         }
      }
   })
})

// ARTIST
const ArtistType = new GraphQLObjectType({
   name: 'Artist',
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      songs: {
         type: new GraphQLList(SongType),
         resolve(parent, args) {
            return Song.find({artistId: parent.id})
         }
      }
   })
})

// QUERY
const RootQueryType = new GraphQLObjectType({
   name: 'RootQuery',
   fields: {
      // individual song
      song: {
         type: SongType,
         args: { id: {type: GraphQLID} },
         resolve(parent, args) {
            return Song.findById(args.id)
         }
      },
      // individual artist
      artist: {
         type: ArtistType,
         args: { id: {type: GraphQLID} },
         resolve(parent, args) {
            return Artist.findById(args.id)
         }
      }, 
      // all songs
      songs: {
         type: new GraphQLList(SongType),
         resolve(parent, args) {
            return Song.find({})
         }
      },
      // all artists
      artists: {
         type: new GraphQLList(ArtistType),
         resolve(parent, args) {
            return Artist.find({})
         }
      }
   }
})

// MUTATION
const MutationType = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      // add artist
      addArtist: {
         type: ArtistType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) }
         },
         resolve(parent, args) {
            return Artist.create({
               name: args.name
            })
         }
      },
      // add song
      addSong: {
         type: SongType,
         args: {
            title: { type: new GraphQLNonNull(GraphQLString) },
            album: { type: new GraphQLNonNull(GraphQLString) },
            artistId: { type: new GraphQLNonNull(GraphQLID) }
         },
         resolve(parent, args) {
            return Song.create({
               title: args.title,
               album: args.album,
               artistId: args.artistId
            })
         }
      }
   }
})

module.exports = new GraphQLSchema({
   query: RootQueryType,
   mutation: MutationType
})