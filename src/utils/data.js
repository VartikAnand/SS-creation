export const categories = [
  {
    name: "river",
    image:
      "https://source.unsplash.com/1600x900/?river"
  },
  {
    name: "anime",
    image:
      "https://source.unsplash.com/1600x900/?anime"
  },
  {
    name: "Illustration",
    image:
      "https://source.unsplash.com/1600x900/?illustration"
  },
  {
    name: "baby",
    image:
      "https://source.unsplash.com/1600x900/?baby"
  },
  {
    name: "vector",
    image:
      "https://source.unsplash.com/1600x900/?vector"
  },
  {
    name: "Blender",
    image:
      "https://source.unsplash.com/1600x900/?Blender"
  },
  {
    name: "designs",
    image:
      "https://source.unsplash.com/1600x900/?designs"
  },
  {
    name: "nature",
    image:
      "https://source.unsplash.com/1600x900/?nature,rain,strom,wave"
  },
  {
    name: "2D/3D Art",
    image:
      "https://source.unsplash.com/1600x900/?art"
  },

  {
    name: "cars",
    image:
      "https://source.unsplash.com/1600x900/?car"
  },
  {
    name: "bikes",
    image:
      "https://source.unsplash.com/1600x900/?bikes"
  },
  {
    name: "love",
    image:
      "https://source.unsplash.com/1600x900/?love"
  },
  {
    name: "Sky",
    image:
      "https://source.unsplash.com/1600x900/?sky"
  },
  {
    name: "Animation",
    image:
      "https://source.unsplash.com/1600x900/?Animation"
  },
  {
    name: "cats",
    image:
      "https://source.unsplash.com/1600x900/?cat"
  },
  {
    name: "dogs",
    image:
      "https://source.unsplash.com/1600x900/?dog"
  },
  {
    name: "forest",
    image:
      "https://source.unsplash.com/1600x900/?forest"
  },
  {
    name: "night",
    image:
      "https://source.unsplash.com/1600x900/?night"
  },
  {
    name: "mountain",
    image:
      "https://source.unsplash.com/1600x900/?mountain"
  },
  {
    name: "places",
    image:
      "https://source.unsplash.com/1600x900/?places"
  },
];

// user query
export const userQuery = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  //   checking the user table in sanity and fetching the matching id

  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' ]{
      image{
        asset -> {
          url
        }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy -> {
          _id,
          userName,
          image
        },
      },
    }`;

  return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc){
    image{
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};